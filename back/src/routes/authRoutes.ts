import express from "express";
import { createToken, generateRandomString } from "../utils/utils";
import { AuthError } from "../utils/customErrors";
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
      // Creamos un nuevo usuario con los campos name, username y rooms
      await usersRef.doc().set({
        name,
        username,
        rooms: [],
      });

      const user = await usersRef.where("username", "==", username).get();

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
      // Sí existe creamos un nuevo token y lo devolvemos logeado
      const { id } = req.body;
      const newToken = createToken(30);

      await usersRef.doc(id).update({
        token: newToken,
        connected: true,
      });

      return res.status(200).json({
        success: true,
        data: {
          id,
          token: newToken,
        },
      });
    } catch (error: any) {
      return next(new Error("Error al buscar el usuario en la BD"));
    }
  }
);
