import { ref, onValue } from "firebase/database";
import { state } from "@/state/state";
import { database } from "@/db/database";

// export async function initFirebase(roomId: string) {
//   const rtdbRoom = await state.getRtdbId(roomId);
//   const rtdbRoomId = rtdbRoom.data.rtdbRoomId;
//   // Inicializa Firebase y escucha los cambios de la room
//   const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
//   onValue(dbRef, (snapshot) => {
//     const currentState = state.getState();
//     const data = snapshot.val();
//     const { owner, guest, scoreboard } = data || {};
//     currentState.scoreboard = scoreboard;
//     currentState.owner = owner;
//     currentState.guest = guest;
//     state.setState(currentState);
//     console.log("Rtdb", currentState);
//   });
// }
