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
      // Verificar si existe un usuario con ese mismo username
      let user = await usersRef.where("username", "==", username).get();
      if (user.docs.length > 0) {
        return next(new AuthError("El usuario ya existe con esos datos"));
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
      // Verificar si existe un usuario con ese mismo id
      // Sí existe creamos un nuevo token y lo devolvemos logeado
      const { id } = req.body;
      const user = await usersRef.doc(id).get();
      if (user.exists) {
        const newToken = createToken(30);

        const updatedUser = await usersRef.doc(id).update({
          token: newToken,
        });

        return res.status(200).json({
          success: true,
          data: {
            id,
            token: newToken,
          },
        });
      }
      return next(new AuthError("El usuario no existe"));
    } catch (error: any) {
      return next(new Error("Error al buscar el usuario en la BD"));
    }
  }
);
