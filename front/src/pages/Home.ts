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
    <button-el to="/setPlayer">Nuevo juego</button-el>
    <button-el to="/rules">Ingresar a sala</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(home);
}
