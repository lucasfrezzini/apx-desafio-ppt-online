import express from "express";
export const authRouter = express.Router();
import { createToken } from "../utils/utils";
import { dataSignupValidator } from "../middlewares/validators/dataSignupMiddlware";
import { firestoreDB } from "../db/database";
import { dataAuthValidator } from "../middlewares/validators/dataAuthMiddleware";

// Referencias DB
const usersRef = firestoreDB.collection("usersPPT");

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
