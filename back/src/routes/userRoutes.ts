import express from "express";
export const userRouter = express.Router();
import { dataGetUserValidator } from "../middlewares/validators/dataGetUserMiddleware";
import { dataSignupValidator } from "../middlewares/validators/dataSignupMiddlware";
import { dataLoginValidator } from "../middlewares/validators/dataLoginMiddlware";
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

      if (!user.exists) {
        throw new ValidationError("El id no existe en la base de datos");
      }

      // Devolvemos el usuario creado
      res.status(200).json({
        success: true,
        data: {
          user: { id, ...user.data() },
        },
      });
    } catch (error: any) {
      return next(new Error(error));
    }
  }
);

userRouter.get(
  "/",
  dataLoginValidator,
  async (req: any, res: any, next: any) => {
    try {
      const { name, email } = req.query;

      // Verificar si existe un usuario con ese mismo email y name
      const user = await usersRef
        .where("email", "==", email)
        .where("name", "==", name)
        .get();

      if (user.docs.length == 0) {
        throw new ValidationError("El usuario no existe en la base de datos");
      }

      // Devolvemos el usuario creado
      res.status(200).json({
        success: true,
        data: {
          user: { id: user.docs[0].id, ...user.docs[0].data() },
        },
      });
    } catch (error: any) {
      return next(new Error(error));
    }
  }
);

userRouter.post(
  "/signup",
  dataSignupValidator,
  async (req: any, res: any, next: any) => {
    const { name, email } = req.body;
    try {
      // Creamos un nuevo usuario con los campos name, email y rooms
      await usersRef.doc().set({
        name,
        email,
        rooms: [],
      });

      const user = await usersRef.where("email", "==", email).get();

      // Devolvemos el usuario creado
      res.status(200).json({
        success: true,
        data: {
          id: user.docs[0].id,
          name,
          email,
          rooms: [],
        },
      });
    } catch (error: any) {
      console.log(error);
      return next(new Error("Error al crear el usuario en la BD"));
    }
  }
);
