import { goTo } from "@/router/router";
import { state } from "@/state/state";
import { initFirebase } from "@/utils/database";

export function initRules() {
  const currentState = state.getState();
  console.log("rules", currentState);
  const rules = document.createElement("section");
  rules.classList.add("rules");

  rules.innerHTML = `
  <header>
    <h2>
      Presioná <span>jugar</span> y elegí: <span>piedra, papel o tijera</span> antes de que pasen <span>los 3 segundos.</span>
      El mejor de 3 gana.
    </h2>
  </header>
  <button-el>¡Jugar!</button-el>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(rules);

  initFirebase(currentState.roomId);

  const button = document.querySelector("button-el")!;
  button.addEventListener("click", (e) => {
    e.preventDefault();
    state.setStartPlayer(currentState.roomId);
    goTo("/lobby");
  });
}
