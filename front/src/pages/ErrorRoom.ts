// TODO Error Rooms - Inexistent Room / Completed Room / User name error
export function initErrorRoom() {
  const errorRoom = document.createElement("section");
  errorRoom.classList.add("errorRoom");

  errorRoom.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <h2>
    Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.
  </h2>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(errorRoom);
}
