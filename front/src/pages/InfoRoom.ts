import { state } from "@/state/state";
import { initFirebase } from "@/utils/database";

function dataInfoRoom(newState: any) {
  console.log("acaá", newState);
  const ownerName = newState.owner.name;
  const ownerWins = newState.owner.current_game_wins;
  const ownerData = ownerName ? `${ownerName}: ${ownerWins}` : "";

  const guestName = newState.guest.name || "Contrincante";
  const guestWins = newState.guest.current_game_wins;
  const guestData = guestWins ? `${guestName}: ${guestWins}` : guestName;

  const roomId = newState.roomId;

  return { ownerData, guestData, roomId };
}

function renderInfoRoom(newState: any) {
  const infoRoomElement = document.createElement("section");
  infoRoomElement.classList.add("infoRoom");

  const { ownerData, guestData, roomId } = dataInfoRoom(newState);

  infoRoomElement.innerHTML = `
    <header class="detailRoom">
      <div>
        <h3>${ownerData}</h3>
        <h3>${guestData}</h3>
      </div>
      <div>
        <h3>Sala <br><span>${roomId}</span></h3>
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

  return infoRoomElement;
}

function updateInfoRoom(newState: any) {
  const { ownerData, guestData, roomId } = dataInfoRoom(newState);

  document.querySelector(".infoRoom h3:nth-child(1)")!.textContent = ownerData;
  document.querySelector(".infoRoom h3:nth-child(2)")!.textContent = guestData;
  document.querySelector(".infoRoom h3:nth-child(3) span")!.textContent =
    roomId;
  document.querySelector(".infoRoom h2 span")!.textContent = roomId;
}

export function initInfoRoom() {
  const currentState = state.getState();
  console.log(currentState);
  const roomId = currentState.roomId;
  const infoRoom = renderInfoRoom(currentState);
  document.querySelector("#app")!.replaceChildren(infoRoom);

  initFirebase(roomId);
  state.suscribe(updateInfoRoom);
}
