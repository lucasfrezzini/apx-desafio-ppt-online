import express from "express";
import cors from "cors";
import { firestoreDB, realtimeDB } from "./src/db/database";
import { generateRandomString } from "./src/utils/utils";
import { v4 as uuidv4 } from "uuid";
import { authRouter } from "./src/routes/authRoutes";
import { userRouter } from "./src/routes/userRoutes";
import { roomsRouter } from "./src/routes/roomsRouter";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";

// Base de datos
const usuarios = [
  {
    id: 1,
    username: "Lucas",
  },
  {
    id: 2,
    username: "Santiago",
  },
  {
    id: 3,
    username: "Tano",
  },
];

// Referencias DB
const roomsRef = firestoreDB.collection("rooms");

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

// posible routes

// post /rooms
// get /rooms/:roomID
// get /rooms/:roomID?userID=1234
// post /rooms/choices
