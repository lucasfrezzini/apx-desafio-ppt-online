import { ref, onValue } from "firebase/database";
import { database } from "@/db/database";
import { state } from "@/state/state";

function dataInfoRoom(newState: any) {
  const ownerName = newState.owner.name;
  const ownerWins = newState.owner.current_game_wins;
  const ownerData = ownerName ? `${ownerName}: ${ownerWins}` : "";

  const guestName = newState.guest.name || "Contrincante";
  const guestWins = newState.guest.current_game_wins;
  const guestData = ownerName ? `${guestName}: ${guestWins}` : guestName;

  const roomId = newState.roomId || "";

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

  console.log("Rtdb", currentState);

  // Renderiza la interfaz con los datos actualizados
  const infoRoomElement = renderInfoRoom(currentState);
  document.querySelector("#app")!.replaceChildren(infoRoomElement);
}
export const onValueCallbackInfoRoom = async (snapshot: any) => {
  const data = snapshot.val();
  updateGameState(data);
};

async function getGameState() {
  const currentState = state.getState();
  const roomId = currentState.roomId;
  const rtdbRoom = await state.getRtdbId(roomId);
  const rtdbRoomId = rtdbRoom.data.rtdbRoomId;

  // Inicializa Firebase y escucha los cambios de la room
  const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
  onValue(dbRef, onValueCallbackInfoRoom);
}

export async function initInfoRoom() {
  getGameState();
}
