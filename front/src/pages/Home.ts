import { state } from "@/state/state";
import { goTo } from "@/router/router";

export function initHome() {
  const home = document.createElement("section");
  home.classList.add("home");

  home.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <div>
    <button-el id="newGame">Nuevo juego</button-el>
    <button-el id="joinGame">Ingresar a sala</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(home);
  const buttonNewGame = document.querySelector("#newGame")!;
  const buttonJoinGame = document.querySelector("#joinGame")!;

  buttonNewGame.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("new game");
    state.setOwner();
    goTo("/setPlayer");
  });

  buttonJoinGame.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("join game");
    goTo("/setPlayer");
  });
}
