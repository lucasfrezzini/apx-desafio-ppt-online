import express from "express";
export const userRouter = express.Router();

// Routes
// get /users/:userId
// post /users/:userId

userRouter.get("/:id", async (req: any, res: any, next: any) => {
  try {
    throw new Error("El nombre de usuario y el email son obligatorios");
  } catch (error: any) {
    next(error); // Enviamos el error al middleware de manejo de errores
  }
});

userRouter.post("/:id", async (req: any, res: any) => {
  res.send("POST users/:id");
});
