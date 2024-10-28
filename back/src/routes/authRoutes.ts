import express from "express";
import { createToken, generateRandomString } from "../utils/utils";
import { dataSignupValidator } from "../middlewares/validators/dataSignupMiddlware";
export const authRouter = express.Router();
import { firestoreDB, realtimeDB } from "../db/database";
import { v4 as uuidv4 } from "uuid";
import { dataAuthValidator } from "../middlewares/validators/dataAuthMiddleware";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

authRouter.post(
  "/signup",
  dataSignupValidator,
  async (req: any, res: any, next: any) => {
    const { name, username } = req.body;
    try {
      // Verificar si existe un usuario con ese mismo username
      let user = await usersRef.where("username", "==", username).get();
      if (user.docs.length > 0) {
        const error = new Error("El usuario ya existe");
        return next(error);
      }

      // Creamos un nuevo usuario con los campos name, username y rooms
      const newUser = await usersRef.doc().set({
        name,
        username,
        rooms: [],
      });

      user = await usersRef.where("username", "==", username).get();

      // Devolvemos el usuario creado
      res.status(200).json({
        success: true,
        data: {
          id: user.docs[0].id,
          name,
          username,
          rooms: [],
        },
      });
    } catch (error: any) {
      console.log(error);
      return next(new Error("Error al crear el usuario en la BD"));
    }
  }
);

authRouter.post(
  "/auth",
  dataAuthValidator,
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.body;
      const user = await usersRef.where("id", "==", id).get();
      if (user.docs.length > 0) {
        const newToken = createToken(30);
        res.status(200).json({
          success: true,
          data: {
            id,
            newToken,
          },
        });
      }
    } catch (error: any) {
      return next(new Error("Error al buscar el usuario en la BD"));
    }
  }
);
