export function initInfoRoom() {
  const infoRoom = document.createElement("section");
  infoRoom.classList.add("infoRoom");

  infoRoom.innerHTML = `
  <header class="detailRoom">
    <div>
      <h3>Marce: 0</h3>
      <h3>Paula: 0</h3>
    </div>
    <div>
      <h3>Sala <br/> 76HH23 </h3>
    </div>
  </header>
  <h2>
    Compartí el código: <br/>
    <span>76HH23</span> <br/>
    Con tu contrincante
  </h2>
  <button-el to="/lobby">¡Jugar!</button-el>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(infoRoom);
}
