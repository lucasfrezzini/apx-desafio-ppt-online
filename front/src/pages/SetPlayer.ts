import { state } from "@/state/state";
import { goTo } from "@/router/router";

export function initPlayerInfo() {
  const currentState = state.getState();

  const playerInfo = document.createElement("section");
  playerInfo.classList.add("playerInfo");

  playerInfo.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <div class="fieldgroup">
    <label>Nombre</label>
    <input type="text">
    <p class="alert hidden">Hubo un error, vuelva a intentarlo ⚠️</p>
    <button-el>${
      currentState.game.imOwner ? "Crear Sala" : "Ingresar a sala"
    }</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(playerInfo);
  const buttonNewGame = document.querySelector("button-el")!;
  const inputName = document.querySelector("input")!;
  const errorEl = document.querySelector("p.alert")!;

  buttonNewGame.addEventListener("click", async (e) => {
    e.preventDefault();
    const errorCreate = await state.setNewPlayer(inputName.value);

    if (!errorCreate) {
      errorEl.classList.remove("hidden");
      setTimeout(() => {
        errorEl.classList.add("hidden");
      }, 3000);
    } else {
      if (currentState.game.imOwner) {
        goTo("/infoRoom");
      } else {
        goTo("/setRoom");
      }
    }
  });
}
