import { ref, onValue } from "firebase/database";
import { database } from "@/db/database";
import { goTo } from "@/router/router";
import { state } from "@/state/state";

async function updateGameState(data: any) {
  const { owner, guest, scoreboard } = data || {};
  const currentState = state.getState();

  // Actualiza las propiedades guest, owner y scoreboard
  currentState.owner = owner;
  currentState.guest = guest;
  currentState.scoreboard = scoreboard;
  state.setState(currentState);

  console.log("Rtdb", currentState);

  await state.saveStateLocal();
  await state.saveStateRtdb();
}

async function handleChoice(choice: string) {
  const errorEl = document.querySelector("p.alert")!;
  try {
    // actualizar el choice
    const currentState = state.getState();
    state.addChoice(choice);
    // Guardo el state en RTDB
    let saveStateRtdbResponse;
    currentState.game.imOwner
      ? (saveStateRtdbResponse = await state.saveOwnerRtdb())
      : (saveStateRtdbResponse = await state.saveGuestRtdb());

    if (!saveStateRtdbResponse.success) {
      throw new Error(saveStateRtdbResponse.error.message);
    }
    state.saveStateLocal();

    // Inicializa Firebase y esperar el nuevo estado para ver si ya seleccion el otro player
    const rtdbRoomId = currentState.rtdbRoomId;
    const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
    onValue(dbRef, async (snapshot) => {
      const data = snapshot.val();
      if (state.areBothChoicesMade()) {
        await updateGameState(data);
        goTo("/game");
      } else {
        // cambiar el alert por esperando
        errorEl.classList.remove("hidden");
        errorEl.textContent = "Esperando el otro jugador";
        setTimeout(() => {
          errorEl.classList.add("hidden");
        }, 5000);
      }
    });
  } catch (error: any) {
    errorEl.classList.remove("hidden");
    errorEl.textContent = error.message;
    setTimeout(() => {
      errorEl.classList.add("hidden");
    }, 5000);
  }
}

class BottomHands extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    // Styles
    this.shadowRoot!.innerHTML = `
    <style>
      .bottom-hands {
        width: 100%;
        display: flex;
        gap: 40px;
        align-items: end;
        justify-content: space-evenly;
        overflow-y: hidden;
      }

      .bottom-hands img {
          cursor: pointer;
          transition: all .5s;
      }
    </style>
    `;

    if (this.hasAttribute("is-big")) {
      this.shadowRoot!.innerHTML += `
      <style>
        .bottom-hands {
          overflow-y: hidden;
          height: 300px;
        }

        .bottom-hands img {
          transform: translateY(30px) scale(1.4);
        }
        
        .bottom-hands:hover img {
          opacity: 0.8;
        }

        .bottom-hands img:hover {
          transform: translateY(-10px) scale(2.2);
          opacity: 1;
        }
      </style>
      `;
    } else {
      this.shadowRoot!.innerHTML += `
      <style>
        
        .bottom-hands img {
          transform: translateY(30px);
        }

        .bottom-hands img:hover {
          transform: translateY(2px);
        }
      </style>
      `;
    }
    // Logic
    this.shadowRoot!.innerHTML += `
    <div class="bottom-hands">
      <img src="/piedra.svg" data-type="stone" alt="Icono Piedra">
      <img src="/papel.svg" data-type="paper" alt="Icono Papel">
      <img src="/tijera.svg" data-type="scissor" alt="Icono Tijera">
    </div>
    `;

    if (this.hasAttribute("is-big")) {
      //? Stone Listener
      const stone = this.shadowRoot!.querySelector('[data-type="stone"]')!;
      stone.addEventListener("click", function () {
        handleChoice("piedra");
      });

      //? Paper Listener
      const paper = this.shadowRoot!.querySelector('[data-type="paper"]')!;
      paper.addEventListener("click", function () {
        handleChoice("papel");
      });

      //? Scissor Listener
      const scissor = this.shadowRoot!.querySelector('[data-type="scissor"]')!;
      scissor.addEventListener("click", function () {
        handleChoice("tijera");
      });
    }
  }
}

customElements.define("bottom-hands", BottomHands);
