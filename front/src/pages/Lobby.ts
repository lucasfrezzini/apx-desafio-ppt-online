export function initLobby() {
  const lobby = document.createElement("section");
  lobby.classList.add("lobby");

  lobby.innerHTML = `
  <header class="detailRoom">
    <div>
      <h3>Marce: 0</h3>
      <h3>Paula: 0</h3>
    </div>
    <div>
      <h3>Sala <br/> <span>76HH23</span> </h3>
    </div>
  </header>
  <h2>
    Esperando a que <span>Paula</span> presione ¡Jugar!...
  </h2>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(lobby);
}
