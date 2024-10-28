export function initRules() {
  const rules = document.createElement("section");
  rules.classList.add("rules");

  rules.innerHTML = `
  <header>
    <h2>
      Presioná <span>jugar</span> y elegí: <span>piedra, papel o tijera</span> antes de que pasen <span>los 3 segundos.</span>
      El mejor de 3 gana.
    </h2>
  </header>
  <button-el to="/lobby">¡Jugar!</button-el>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(rules);
}
