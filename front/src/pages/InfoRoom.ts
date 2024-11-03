import { state } from "@/state/state";

export function initInfoRoom() {
  const currentState = state.getState();
  const infoRoom = document.createElement("section");
  infoRoom.classList.add("infoRoom");

  const ownerName = currentState.owner.name;
  const ownerWins = currentState.owner.current_game_wins;
  const ownerData = ownerName ? `${ownerName}: ${ownerWins}` : "";

  const guestName = currentState.guest.name || "Contrincante";
  const guestWins = currentState.guest.current_game_wins;
  const guestData = guestWins ? `${guestName}: ${guestWins}` : guestName;

  const roomId = currentState.roomId;

  infoRoom.innerHTML = `
  <header class="detailRoom">
    <div>
      <h3>${ownerData}</h3>
      <h3>${guestData}</h3>
    </div>
    <div>
      <h3>Sala <br/> <span>${roomId}<span> </h3>
    </div>
  </header>
  <h2>
    Compartí el código:
    <span>${roomId}</span>
    con tu contrincante
  </h2>
  <button-el to="/rules">¡Ver las reglas!</button-el>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(infoRoom);
}
