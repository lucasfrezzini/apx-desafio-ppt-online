import { AuthError, ValidationError } from "../../utils/customErrors";
import { firestoreDB } from "../../db/database";

// Referencias DB
const roomsRef = firestoreDB.collection("roomsPPT");
const usersRef = firestoreDB.collection("usersPPT");

export const dataChoicesValidator = async (req: any, res: any, next: any) => {
  const { id, choice, owner } = req.body;
  const { roomId } = req.params;

  if (!roomId || !id || !choice || owner === undefined) {
    return next(
      new ValidationError("Faltan datos obligatorios, vuelva a intentarlo")
    );
  }
  const user = await usersRef.doc(id).get();
  const room = await roomsRef.doc(roomId).get();
  if (!user.exists || !room.exists) {
    return next(
      new AuthError("Los datos no son correctos, vuelva a intentarlo")
    );
  }

  next();
};
