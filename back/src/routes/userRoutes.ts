import express from "express";
export const userRouter = express.Router();
import { ValidationError } from "../utils/customErrors";
import { firestoreDB } from "../db/database";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

// TODO: Crear un middleware para comprobar si los datos son correctos

userRouter.get("/:email", async (req: any, res: any, next: any) => {
  try {
    const { email } = req.params;
    if (!email) {
      throw new ValidationError("El email es obligatorio");
    }
    // Continuar con la lógica del controlador
    next();
  } catch (error: any) {
    next(error);
  }
});

userRouter.get("/:email", async (req: any, res: any, next: any) => {
  try {
    const { email } = req.params;

    // Verificar si existe un usuario con ese mismo email
    const user = await usersRef.where("email", "==", email).get();

    if (user.docs.length === 0) {
      throw new ValidationError("El email no existe en la base de datos");
    }

    // Devolvemos el usuario creado
    res.status(200).json({
      success: true,
      data: {
        id: user.docs[0].id,
      },
    });
  } catch (error: any) {
    return next(new Error(error));
  }
});
