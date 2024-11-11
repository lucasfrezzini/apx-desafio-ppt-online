import { ref, onValue, off } from "firebase/database";
import { database } from "@/db/database";
import { goTo } from "@/router/router";
import { state } from "@/state/state";

import { onValueCallbackInfoRoom } from "./InfoRoom";
import { onValueCallbackLobby } from "./Lobby";

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
}

export const onValueCallbackChoice = async (snapshot: any) => {
  const data = snapshot.val();
  await updateGameState(data);
  if (state.areBothChoicesMade()) {
    // En el unico caso que voy es si ambos ya seleccionaron
    console.log("Both choices made");
    const currentState = state.getState();
    const rtdbRoomId = currentState.rtdbRoomId;
    const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
    off(dbRef, "value", onValueCallbackChoice);
    goTo("/game");
  }
};

function initFirebase() {
  // Inicializa Firebase y esperar el nuevo estado para ver si ya seleccion el otro player
  const currentState = state.getState();
  const rtdbRoomId = currentState.rtdbRoomId;
  const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
  onValue(dbRef, onValueCallbackChoice);
}
export function initChoice() {
  const choice = document.createElement("section");
  choice.classList.add("choice");

  choice.innerHTML = `
  <counter-time></counter-time>
  <p class="alert hidden"></p>
  <bottom-hands is-big></bottom-hands>
  `;

  const currentState = state.getState();
  const rtdbRoomId = currentState.rtdbRoomId;
  const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
  off(dbRef, "value", onValueCallbackInfoRoom);
  off(dbRef, "value", onValueCallbackLobby);
  document.querySelector("#app")!.replaceChildren(choice);

  initFirebase();
}
