import { AuthError, ValidationError } from "../utils/customErrors";
import { verifyExpiration } from "../utils/utils";
import { firestoreDB } from "../db/database";

const usersRef = firestoreDB.collection("usersPPT");

export const connectedMiddleware = async (req: any, res: any, next: any) => {
  const { id, token } = req.body;

  if (!id || !token) {
    return next(new ValidationError("El id y el token son obligatorios"));
  }

  try {
    const user = await usersRef.doc(id).get();

    if (!user.exists) {
      return next(new AuthError("El usuario no existe"));
    }

    if (user.data()!.token.id !== token.id) {
      return next(new AuthError("Usuario sin token no autorizado"));
    }

    if (user.data()!.connected) {
      return next(new AuthError("Usuario ya conectado no autorizado"));
    }

    if (verifyExpiration(token.time)) {
      await usersRef.doc(id).update({
        connected: false,
      });
      return next(new AuthError("Usuario con token expirado no autorizado"));
    }

    next();
  } catch (error) {
    return next(new AuthError("Error en la verificación de la conexión"));
  }
};
