import express from "express";
export const userRouter = express.Router();
import { dataGetUserValidator } from "../middlewares/validators/dataGetUserMiddleware";
import { ValidationError } from "../utils/customErrors";
import { firestoreDB } from "../db/database";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

userRouter.get(
  "/:id",
  dataGetUserValidator,
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;

      // Verificar si existe un usuario con ese mismo email
      const user = await usersRef.doc(id).get();

      if (user.exists) {
        throw new ValidationError("El id no existe en la base de datos");
      }

      // Devolvemos el usuario creado
      res.status(200).json({
        success: true,
        data: {
          user: user.data(),
        },
      });
    } catch (error: any) {
      return next(new Error(error));
    }
  }
);
