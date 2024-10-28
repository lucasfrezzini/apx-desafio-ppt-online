import { AuthError, ValidationError } from "../../utils/customErrors";
import { firestoreDB } from "../../db/database";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

export const dataAuthValidator = async (req: any, res: any, next: any) => {
  const { id } = req.body;

  if (!id) {
    return next(new ValidationError("El id es obligatorio"));
  }

  const user = await usersRef.doc(id).get();
  if (!user.exists) {
    return next(new AuthError("El usuario no existe"));
  }

  next();
};
