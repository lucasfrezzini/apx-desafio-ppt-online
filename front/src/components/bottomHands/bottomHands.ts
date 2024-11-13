import { state } from "@/state/state";
import { waitForTimeout } from "@/utils/utils";

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

    // Aviso que estoy esperando al contrincante
    errorEl.classList.remove("hidden");
    errorEl.textContent = "Esperando el otro jugador";
  } catch (error: any) {
    errorEl.classList.remove("hidden");
    errorEl.textContent = error.message;
    await waitForTimeout(5000);
    errorEl.classList.add("hidden");
  }
}

class BottomHands extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
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
      <img src="apx-desafio-ppt-online/piedra.svg" data-type="stone" alt="Icono Piedra">
      <img src="apx-desafio-ppt-online/papel.svg" data-type="paper" alt="Icono Papel">
      <img src="apx-desafio-ppt-online/tijera.svg" data-type="scissor" alt="Icono Tijera">
    </div>
    `;

    if (this.hasAttribute("is-big")) {
      //? Stone Listener
      const stone = this.shadowRoot!.querySelector('[data-type="stone"]')!;
      stone.addEventListener("click", function (event) {
        event.preventDefault();
        handleChoice("piedra");
      });

      //? Paper Listener
      const paper = this.shadowRoot!.querySelector('[data-type="paper"]')!;
      paper.addEventListener("click", function (event) {
        event.preventDefault();
        handleChoice("papel");
      });

      //? Scissor Listener
      const scissor = this.shadowRoot!.querySelector('[data-type="scissor"]')!;
      scissor.addEventListener("click", function (event) {
        event.preventDefault();
        handleChoice("tijera");
      });
    }
  }
}

customElements.define("bottom-hands", BottomHands);
