export function initHome() {
  const home = document.createElement("section");
  home.classList.add("home");

  home.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <button-el to="/rules">Empezar</button-el>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(home);
}
