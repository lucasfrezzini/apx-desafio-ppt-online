export function initRules() {
  const rules = document.createElement("section");
  rules.classList.add("rules");

  rules.innerHTML = `
  <header>
    <h2>
      Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
      El mejor de 3 gana.
    </h2>
  </header>
  <button-el to="/choice">¡Jugar!</button-el>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(rules);
}
