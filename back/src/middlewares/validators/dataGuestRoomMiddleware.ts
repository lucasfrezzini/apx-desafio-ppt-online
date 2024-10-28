import { AuthError, ValidationError } from "../../utils/customErrors";
import { firestoreDB } from "../../db/database";

// Referencias DB
const roomsRef = firestoreDB.collection("roomsPPT");
const usersRef = firestoreDB.collection("usersPPT");

export const dataGuestRoomValidator = async (req: any, res: any, next: any) => {
  const { id } = req.body;
  const { roomId } = req.params;

  if (!roomId || !id) {
    return next(
      new ValidationError("El roomId y el id del guest son obligatorios")
    );
  }
  const user = await usersRef.doc(id).get();
  const room = await roomsRef.doc(roomId).get();
  if (!user.exists || !room.exists) {
    return next(new AuthError("El roomId o el id del guest no existen"));
  }

  next();
};
