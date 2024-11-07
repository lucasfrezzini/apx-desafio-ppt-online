import { state } from "@/state/state";
import { goTo } from "@/router/router";

export function initRoomConfig() {
  const roomConfig = document.createElement("section");
  roomConfig.classList.add("roomConfig");

  roomConfig.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <div class="fieldgroup">
    <input type="text" placeholder="Ingresa el código de la sala">
    <p class="alert hidden"></p>
    <button-el>Ingresar a la sala</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(roomConfig);

  const currentState = state.getState();
  const input = document.querySelector("input")!;
  const button = document.querySelector("button-el")!;
  const errorEl = document.querySelector("p.alert")!;

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      // Seteo la sala sí es el guest
      if (!currentState.game.imOwner) {
        const setUserRoomResult = await state.setUserRoom(false, input.value);
        if (!setUserRoomResult.success) {
          throw new Error(setUserRoomResult.error.message);
        }

        // Guardo el state en RTDB
        const saveStateRtdbResponse = await state.saveStateRtdb();
        if (!saveStateRtdbResponse.success) {
          throw new Error(saveStateRtdbResponse.error.message);
        }
      }

      goTo("/rules");
    } catch (error: any) {
      errorEl.classList.remove("hidden");
      errorEl.textContent = error.message;
      setTimeout(() => {
        errorEl.classList.add("hidden");
      }, 5000);
    }
  });
}
