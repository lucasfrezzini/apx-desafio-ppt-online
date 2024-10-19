export function initPlayerInfo() {
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
    <button-el to="/infoRoom">Empezar</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(playerInfo);
}
