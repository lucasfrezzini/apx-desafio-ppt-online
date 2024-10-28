import { AuthError, ValidationError } from "../utils/customErrors";
import { verifyExpiration } from "../utils/utils";
import { firestoreDB } from "../db/database";

const usersRef = firestoreDB.collection("usersPPT");

export const connectedMiddleware = async (req: any, res: any, next: any) => {
  const { id, token } = req.body;

  if (!id || !token) {
    return next(new ValidationError("El id y el token son obligatorios"));
  }
  // verificar que el usuario este autenticado
  const user = await usersRef.doc(id).get();
  if (!user.exists) {
    return next(new AuthError("El usuario no existe"));
  }
  // verificar que el token sea correcto
  if (user.data()!.token.id !== token.id) {
    return next(new AuthError("Usuario sin token no autorizado"));
  }
  // verificar que el tiempo sea menor al tiempo de expiración
  if (verifyExpiration(token.time)) {
    return next(new AuthError("Usuario con token expirado no autorizado"));
  }

  next();
};
