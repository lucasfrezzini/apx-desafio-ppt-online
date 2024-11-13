import express from "express";
import cors from "cors";
import { authRouter } from "./src/routes/authRoutes";
import { userRouter } from "./src/routes/userRoutes";
import { roomsRouter } from "./src/routes/roomsRouter";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import { connectedMiddleware } from "./src/middlewares/connectedMiddleware";

const port = 3000;
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use(connectedMiddleware);
app.use("/api/rooms", roomsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`El servidor se está ejecutando desde el puerto: ${port}`);
});
