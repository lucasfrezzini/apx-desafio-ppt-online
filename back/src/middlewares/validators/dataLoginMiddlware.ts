import { firestoreDB } from "../../db/database";
import { AuthError, ValidationError } from "../../utils/customErrors";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

export const dataLoginValidator = async (req: any, res: any, next: any) => {
  const { name, email } = req.query;

  if (!name || !email) {
    return next(new ValidationError("Faltan campos obligatorios"));
  }

  //Verificar que el email sea valido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ValidationError("El email proporcionado no es valido"));
  }

  // Verificar si no existe un usuario con ese mismo email
  let user = await usersRef.where("email", "==", email).get();
  if (user.docs.length == 0) {
    return next(
      new AuthError("El usuario no existe con esos datos. Crea una cuenta")
    );
  }

  next();
};
