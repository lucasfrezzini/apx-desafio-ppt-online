import { goTo } from "@/router/router";
import { state } from "@/state/state";
import { waitForTimeout } from "@/utils/utils";

export function initRules() {
  const currentState = state.getState();
  const rules = document.createElement("section");
  rules.classList.add("rules");

  rules.innerHTML = `
  <header>
    <h2>
      Presioná <span>jugar</span> y elegí: <span>piedra, papel o tijera</span> antes de que pasen <span>los 3 segundos.</span>
      El mejor de 3 gana.
    </h2>
  </header>
  <div class="fieldgroup">
    <button-el>¡Jugar!</button-el>
    <p class="alert hidden"></p>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(rules);

  const button = document.querySelector("button-el")!;
  const errorEl = document.querySelector("p.alert")!;

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      currentState.game.imOwner ? state.setOwnerStart() : state.setGuestStart();
      // Guardo el state en RTDB
      let saveStateRtdbResponse;
      currentState.game.imOwner
        ? (saveStateRtdbResponse = await state.saveOwnerRtdb())
        : (saveStateRtdbResponse = await state.saveGuestRtdb());

      if (!saveStateRtdbResponse.success) {
        throw new Error(saveStateRtdbResponse.error.message);
      }
      goTo("/lobby");
    } catch (error: any) {
      errorEl.classList.remove("hidden");
      errorEl.textContent = error.message;
      await waitForTimeout(5000);
      errorEl.classList.add("hidden");
    }
  });
}
