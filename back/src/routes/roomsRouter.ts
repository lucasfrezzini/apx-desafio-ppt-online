import express from "express";
export const roomsRouter = express.Router();
import { firestoreDB, realtimeDB } from "../db/database";
import { generateRandomString, whoWins } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { dataNewRoomValidator } from "../middlewares/validators/dataNewRoomMiddleware";
import { dataGuestRoomValidator } from "../middlewares/validators/dataGuestRoomMiddleware";
import { dataChoicesValidator } from "../middlewares/validators/dataChoicesMiddleware";
import { ValidationError } from "../utils/customErrors";

// Referencias DB
const roomsRef = firestoreDB.collection("roomsPPT");
const usersRef = firestoreDB.collection("usersPPT");

//POST /rooms/new: creamos las rooms en ambas BD y las asociamos a un owner
roomsRouter.post(
  "/new",
  dataNewRoomValidator,
  async (req: any, res: any, next: any) => {
    const { id } = req.body;

    try {
      const user = await usersRef.doc(id).get();
      const shortRoomID = generateRandomString(5);
      const longRoomID = uuidv4();
      // Crear el Room en la RTDB con el longRoomID y declarar un owner de ese room
      const roomRTDBRef = await realtimeDB.ref(`roomsPPT/${longRoomID}`);
      await roomRTDBRef.set({
        scoreboard: {
          owner: 0,
          guest: 0,
        },
        lastRoundChoices: {
          owner: "",
          guest: "",
          round: 0,
        },
        owner: {
          id,
          online: false,
          start: false,
        },
        guest: {
          id: "",
          online: false,
          start: false,
        },
      });

      // Crear el Room en Firestore asociando el longRoomID con el shortRoomID para ubicarlo fácil
      const newRoom = {
        rtdbRoomID: longRoomID,
        owner: {
          id,
          name: user.data()!.name,
          email: user.data()!.email,
        },
        guest: {
          id: "",
          name: "",
          email: "",
        },
        lastGame: {
          owner: 0,
          guest: 0,
        },
        historicalScoreboard: {
          owner: 0,
          guest: 0,
        },
      };
      await roomsRef.doc(shortRoomID).set(newRoom);
      // Aniadimos el Room al owner verificando que no exista ya para no repetirla
      if (
        !user
          .data()!
          .rooms.find((room: any) => room.shortRoomID === shortRoomID)
      ) {
        const allRooms = [...user.data()!.rooms, { shortRoomID, owner: true }];
        await usersRef.doc(id).update({
          rooms: allRooms,
        });
      }

      // Devolvemos el Room creado
      res.status(200).json({
        success: true,
        data: shortRoomID,
      });
    } catch (error: any) {
      // return next(new Error("Error al crear nueva Room en la BD"));
      return next(error);
    }
  }
);

// POST /rooms/:roomId agrega un guest al room indicado
roomsRouter.post(
  "/:roomId",
  dataGuestRoomValidator,
  async (req: any, res: any, next: any) => {
    const { roomId } = req.params;
    const { id: guestId } = req.body;
    try {
      const user = await usersRef.doc(guestId).get();
      const room = await roomsRef.doc(roomId).get();

      const allRooms = [...user.data()!.rooms, { roomId, owner: false }];
      await usersRef.doc(guestId).update({
        rooms: allRooms,
      });

      await roomsRef.doc(roomId).update({
        guest: {
          id: guestId,
          name: user.data()!.name,
          email: user.data()!.email,
        },
      });

      const { rtdbRoomID } = room.data()!;
      const roomRTDBRef = await realtimeDB.ref(`roomsPPT/${rtdbRoomID}`);
      await roomRTDBRef.update({
        guest: {
          id: guestId,
          online: false,
          start: false,
        },
      });

      // Devolvemos el Room creado
      res.status(200).json({
        success: true,
        data: roomId,
      });
    } catch (error) {
      return next(new Error("Error al agregar guest al room en la BD"));
    }
  }
);

// POST /rooms/:roomId/choices para agregar un choice a ese room
roomsRouter.post(
  "/:roomId/choices",
  dataChoicesValidator,
  async (req: any, res: any, next: any) => {
    try {
      // Llega un id de room, un owner o guest y una choice
      const { choice, owner } = req.body;
      const { roomId } = req.params;

      // Obtenemos referencias a las diferentes BD
      const room = await roomsRef.doc(roomId).get();
      const { rtdbRoomID } = room.data()!;
      const roomRTDBRef = await realtimeDB.ref(`roomsPPT/${rtdbRoomID}`);
      const snapshot = await roomRTDBRef.get();

      // Obtenemos las ultimas choices y el scoreboard
      const oldChoices = await snapshot.val().lastRoundChoices;
      const scoreboard = await snapshot.val().scoreboard;

      // Actualizamos las diferentes choices
      if (owner) {
        oldChoices.owner = choice;
        oldChoices.ownerSelected = true;
      } else {
        oldChoices.guest = choice;
        oldChoices.guestSelected = true;
      }

      // Sí ambos seleccionaron evaluamos ganador de ronda y actualizamos scoreboard
      if (oldChoices.ownerSelected && oldChoices.guestSelected) {
        oldChoices.round += 1;
        oldChoices.ownerSelected = false;
        oldChoices.guestSelected = false;
        if (whoWins(oldChoices.owner, oldChoices.guest) == 1) {
          scoreboard.owner += 1;
        } else if (whoWins(oldChoices.owner, oldChoices.guest) == 2) {
          scoreboard.guest += 1;
        }
      }

      console.log("oldChoices", oldChoices);
      console.log("scoreboard", scoreboard);

      // Actualizamos RTDB
      await roomRTDBRef.update({
        lastRoundChoices: oldChoices,
        scoreboard,
      });

      // Actualizamos Firestore
      await roomsRef.doc(roomId).update({
        lastGame: {
          owner: scoreboard.owner,
          guest: scoreboard.guest,
        },
      });
      res.status(200).json({
        success: true,
        data: "Choices actualizados en Firestore y RTDB correctamente",
      });
    } catch (error) {
      return next(new Error("Error al actualizar choices en la BD"));
    }
  }
);

// POST /rooms/:roomId/start setea Start en true al player
roomsRouter.post(
  "/:roomId/start",
  dataGuestRoomValidator,
  async (req: any, res: any, next: any) => {
    const { roomId } = req.params;
    const { id } = req.body;
    console.log(roomId, id);
    try {
      const user = await usersRef.doc(id).get();
      const room = await roomsRef.doc(roomId).get();

      const isOwner = user
        .data()!
        .rooms.find((room: any) => room.shortRoomID === roomId).owner;
      const player = isOwner ? "owner" : "guest";

      const { rtdbRoomID } = room.data()!;
      const roomRTDBRef = await realtimeDB.ref(`roomsPPT/${rtdbRoomID}`);
      const roomRTDBSnapshot = await roomRTDBRef.get();
      const roomRTDBValue = roomRTDBSnapshot.val();
      await roomRTDBRef.update({
        [player]: {
          ...roomRTDBValue[player],
          start: true,
        },
      });

      res.status(200).json({
        success: true,
        data: { rtdbRoomID },
      });
    } catch (error) {
      return next(new Error("Error al agregar guest al room en la BD"));
    }
  }
);

// POST /rooms/:roomId/rtdb obtiene el state completo del rtdb
roomsRouter.post("/:roomId/rtdb", async (req: any, res: any, next: any) => {
  const { roomId } = req.params;

  if (!roomId) {
    return next(new ValidationError("El roomId es obligatorio"));
  }

  try {
    const room = await roomsRef.doc(roomId).get();

    if (!room.exists) {
      return next(new Error("La room no existe"));
    }

    const rtdbRoomID = room.data()!.rtdbRoomID;
    if (!rtdbRoomID) {
      return next(new Error("El roomId no tiene una referencia al RTDB"));
    }

    res.status(200).json({
      success: true,
      data: { rtdbRoomID },
    });
  } catch (error) {
    return next(error);
  }
});

// POST /rooms/:roomId/save guarda el state completo en el rtdb
roomsRouter.post("/:roomId/save", async (req: any, res: any, next: any) => {
  const { roomId: rtdbRoomID } = req.params;
  const { state } = req.body;

  if (!rtdbRoomID) {
    return next(new ValidationError("El roomId es obligatorio"));
  }

  try {
    const roomRTDBRef = await realtimeDB.ref(`roomsPPT/${rtdbRoomID}`);
    const snapshot = await roomRTDBRef.get();
    const roomState = await snapshot.val();

    if (!roomState) {
      return next(new Error("La room no existe"));
    }

    await roomRTDBRef.set(state);

    res.status(200).json({
      success: true,
      data: { rtdbRoomID },
    });
  } catch (error) {
    return next(error);
  }
});
