import { firestoreDB } from "../../db/database";
import { AuthError } from "../../utils/customErrors";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

export const dataSignupValidator = async (req: any, res: any, next: any) => {
  const { name, username } = req.body;

  if (!name || !username) {
    return next(new Error("El nombre y el usuario son obligatorios"));
  }

  // Verificar si existe un usuario con ese mismo username
  let user = await usersRef.where("username", "==", username).get();
  if (user.docs.length > 0) {
    return next(new AuthError("El usuario ya existe con esos datos"));
  }

  next();
};
