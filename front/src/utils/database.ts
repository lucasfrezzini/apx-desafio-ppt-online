import { ref, onValue } from "firebase/database";
import { state } from "@/state/state";
import { database } from "@/db/database";

const URL_BASE = "http://localhost:3000/api";

export async function initFirebase(roomId: string) {
  const rtdbRoom = await state.getRtdbId(roomId);
  const rtdbRoomID = rtdbRoom.data.rtdbRoomID;
  // Inicializa Firebase y escucha los cambios de la room
  const dbRef = ref(database, `roomsPPT/${rtdbRoomID}`);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const room = Object.values(data || {});
    console.log("Rtdb", data);
    // state.setNewMessages(messages);
    // this.updateMessages();
    // this.updateMessages(data);
  });
}

// updateMessages(data: Array<any>) {
export function updateMessages() {
  const currentState = state;
  // this.messages = currentState.getMessages();
  // this.render();

  // this.messages = Object.values(data || {});
  // this.render();
}
