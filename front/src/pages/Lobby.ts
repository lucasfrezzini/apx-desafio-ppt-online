import { state } from "@/state/state";

export function initLobby() {
  const currentState = state.getState();
  const lobby = document.createElement("section");
  lobby.classList.add("lobby");

  const ownerName = currentState.owner.name;
  const ownerWins = currentState.owner.current_game_wins;
  const ownerData = ownerName ? `${ownerName}: ${ownerWins}` : "";

  const guestName = currentState.guest.name || "Contrincante";
  const guestWins = currentState.guest.current_game_wins;
  const guestData = guestWins ? `${guestName}: ${guestWins}` : guestName;

  const roomId = currentState.roomId;

  lobby.innerHTML = `
  <header class="detailRoom">
    <div>
      <h3>${ownerData}</h3>
      <h3>${guestData}</h3>
    </div>
    <div>
      <h3>Sala <br/> <span>${roomId}<span> </h3>
    </div>
  </header>
  <h2 class="loading">
    Esperando a que <br/><span>${guestName}</span> presione JUGAR
  </h2>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(lobby);
}
