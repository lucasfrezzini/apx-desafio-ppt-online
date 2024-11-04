import { ref, onValue } from "firebase/database";
import { state } from "@/state/state";
import { database } from "@/db/database";

export function initFirebase(roomId: string) {
  // Inicializa Firebase y escucha los cambios de la room
  const dbRef = ref(database, `roomsPPT/${roomId}`);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const room = Object.values(data || {});
    console.log(room);
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
