import express from "express";
import cors from "cors";
import "dotenv/config";

import { authRouter } from "./src/routes/authRoutes";
import { userRouter } from "./src/routes/userRoutes";
import { roomsRouter } from "./src/routes/roomsRouter";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import { connectedMiddleware } from "./src/middlewares/connectedMiddleware";

const port = process.env.PORT || 3000;
const app = express();
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//   })
// );
const whitelist = ["https://lucasfrezzini.github.io/apx-desafio-ppt-online"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use(connectedMiddleware);
app.use("/api/rooms", roomsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`El servidor se está ejecutando desde el puerto: ${port}`);
});
