import { firestoreDB } from "../../db/database";
import { AuthError, ValidationError } from "../../utils/customErrors";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

export const dataSignupValidator = async (req: any, res: any, next: any) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new ValidationError("Faltan campos obligatorios"));
  }

  //Verificar que el email sea valido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ValidationError("El email proporcionado no es valido"));
  }

  // Verificar si existe un usuario con ese mismo email
  let user = await usersRef.where("email", "==", email).get();
  if (user.docs.length > 0) {
    return next(new AuthError("El usuario ya existe con esos datos. Logueate"));
  }

  next();
};
