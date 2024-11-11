import { ref, onValue, off } from "firebase/database";
import { database } from "@/db/database";
import { state } from "@/state/state";
import { goTo } from "@/router/router";

import { onValueCallbackInfoRoom } from "./InfoRoom";

function dataLobby(newState: any) {
  const ownerName = newState.owner.name;
  const ownerWins = newState.owner.current_game_wins;
  const ownerData = ownerName ? `${ownerName}: ${ownerWins}` : "";

  const guestName = newState.guest.name || "Contrincante";
  const guestWins = newState.guest.current_game_wins;
  const guestData = ownerName ? `${guestName}: ${guestWins}` : guestName;

  const roomId = newState.roomId || "";

  return { ownerData, ownerName, guestData, guestName, roomId };
}

export function renderLobby(newState: any) {
  const lobby = document.createElement("section");
  lobby.classList.add("lobby");

  const { ownerData, guestData, guestName, ownerName, roomId } =
    dataLobby(newState);

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
    Esperando a que <br/><span>${
      newState.game.imOwner ? guestName : ownerName
    }</span> presione JUGAR
  </h2>
  <bottom-hands></bottom-hands>
  `;

  return lobby;
}

async function updateGameState(data: any) {
  const { owner, guest, scoreboard } = data || {};
  const currentState = state.getState();

  // Actualiza las propiedades guest, owner y scoreboard
  currentState.owner = {
    ...currentState.owner,
    ...owner,
  };
  currentState.guest = {
    ...currentState.guest,
    ...guest,
  };
  currentState.scoreboard = {
    ...currentState.scoreboard,
    ...scoreboard,
  };

  // Renderiza la interfaz con los datos actualizados
  const lobbyElement = renderLobby(currentState);

  if (state.isBothStart()) {
    goTo("/choice");
  } else {
    const rtdbRoomId = currentState.rtdbRoomId;
    const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
    off(dbRef, "value", onValueCallbackInfoRoom);
    document.querySelector("#app")!.replaceChildren(lobbyElement);
  }
}
export const onValueCallbackLobby = async (snapshot: any) => {
  const data = snapshot.val();
  updateGameState(data);
};
async function getGameState() {
  const currentState = state.getState();
  const rtdbRoomId = currentState.rtdbRoomId;

  // Inicializa Firebase y escucha los cambios de la room
  const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
  onValue(dbRef, onValueCallbackLobby);
}

export async function initLobby() {
  getGameState();
}
