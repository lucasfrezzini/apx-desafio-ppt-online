import express from "express";
import cors from "cors";
import { authRouter } from "./src/routes/authRoutes";
import { userRouter } from "./src/routes/userRoutes";
import { roomsRouter } from "./src/routes/roomsRouter";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`El servidor se está ejecutando desde el puerto: ${port}`);
});
