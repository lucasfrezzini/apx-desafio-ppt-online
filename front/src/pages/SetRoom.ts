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
    <label>Ingresa el código</label>
    <input type="text">
    <button-el to="/infoRoom">Ingresar a la sala</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(roomConfig);
}
