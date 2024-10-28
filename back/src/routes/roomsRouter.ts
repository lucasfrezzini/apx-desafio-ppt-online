import express from "express";
export const roomsRouter = express.Router();

// Routes
// post /rooms
// get /rooms/:roomID
// get /rooms/:roomID?userID=1234
// post /rooms/choices

roomsRouter.post("/", async (req: any, res: any) => {
  res.send("POST rooms");
});

roomsRouter.get("/", async (req: any, res: any) => {
  res.send("GET rooms");
});

roomsRouter.get("/:id", async (req: any, res: any) => {
  res.send("GET rooms/:id");
});
roomsRouter.post("/:id", async (req: any, res: any) => {
  res.send("POST rooms/:id");
});

roomsRouter.post("/choices", async (req: any, res: any) => {
  res.send("POST rooms/choices");
});

//* POST /rooms: creamos las rooms en ambas BD y las asociamos
// app.post("/rooms", async (req: any, res: any) => {
//   const userID = req.body.userID || "";
//   // Evita variables vacías o nulas
//   if (
//     Object.values(req.body).includes("") ||
//     Object.keys(req.body).length === 0 ||
//     userID.replaceAll(" ", "") == ""
//   ) {
//     return res.status(400).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error con la validación de datos",
//         errorDetails: {
//           issue: "No se envió un ID válido",
//         },
//       },
//     });
//   }

//   // Verificar si existe un usuario con ese ID
//   const user = await usersRef.doc(userID).get();
//   if (!user.exists) {
//     return res.status(401).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error con la validación de datos",
//         errorDetails: {
//           issue: "El ID no existe",
//         },
//       },
//     });
//   }

//   // Verificar que el usuario no tenga un room creado (llamar a la ref y filtrar manualmente)
//   const rooms = realtimeDB.ref(`chatrooms`);
//   const snapshot = await rooms.get();
//   const ownerRoom = Object.values(snapshot.val()).find((room: any) => {
//     return room.owner === userID;
//   });
//   if (ownerRoom) {
//     return res.status(401).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error con la validación de datos",
//         errorDetails: {
//           issue: "El usuario ya tiene un Room creado",
//         },
//       },
//     });
//   }

//   try {
//     const shortRoomID = generateRandomString(5);
//     const longRoomID = uuidv4();
//     // Crear el Room en la RTDB con el longRoomID y declarar un owner de ese room
//     const roomRTDBRef = await realtimeDB.ref(`chatrooms/${longRoomID}`);
//     await roomRTDBRef.set({
//       messages: null,
//       owner: userID,
//     });

//     // Crear el Room en Firestore asociando el longRoomID con el shortRoomID para ubicarlo fácil
//     await roomsRef.doc(shortRoomID).set({
//       rtdbRoomID: longRoomID,
//     });
//     res.status(200).json({
//       type: "success",
//       data: {
//         messageKey: "Éxito",
//         messageDescription: "Se creo correctamente el Room",
//         successDetails: {
//           shortRoomID,
//           longRoomID,
//         },
//       },
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error al buscar el usuario en la BD",
//         errorDetails: {
//           issue: error.message,
//         },
//       },
//     });
//   }
// });

//* GET /rooms/:roomId?userid=1234 devuelve el room de realtimeDB asociado a ese userID y roomID
// app.get("/rooms/:roomID", async (req: any, res: any) => {
//   const roomID = req.params.roomID || "";
//   const userID: any = req.query.userID || "";

//   // Evita variables vacías o nulas
//   if (
//     Object.values(req.params).includes("") ||
//     req.params.roomID.length === 0 ||
//     roomID.replaceAll(" ", "") == ""
//   ) {
//     return res.status(400).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error con la validación de datos",
//         errorDetails: {
//           issue: "No se envió un ID válido",
//         },
//       },
//     });
//   }

//   // Verificar si existe un usuario con ese ID
//   const user = await usersRef.doc(userID).get();
//   if (!user.exists) {
//     return res.status(401).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error con la validación de datos",
//         errorDetails: {
//           issue: "El ID de usuario no existe",
//         },
//       },
//     });
//   }

//   // Verificar el roomID corto que sea válido
//   const room = await roomsRef.doc(roomID).get();
//   if (!room.exists) {
//     return res.status(401).json({
//       type: "error",
//       data: {
//         messageKey: "Error",
//         messageDescription: "Error con la validación de datos",
//         errorDetails: {
//           issue: "El RoomID no existe",
//         },
//       },
//     });
//   } else {
//     const { rtdbRoomID } = room.data()!;
//     res.status(200).json({
//       type: "success",
//       data: {
//         messageKey: "Éxito",
//         messageDescription: "Se encontró el Room",
//         successDetails: {
//           roomID,
//           rtdbRoomID,
//         },
//       },
//     });
//   }
// });

// * POST /rooms/messages para agregar un message a ese room
// app.post("/rooms/messages", async (req: any, res: any) => {
//   console.log("entre");
//   const message = req.body.message || "";
//   const roomID = req.body.roomID || "";
//   const username = req.body.username || "";

//   const roomRTDBRef = realtimeDB.ref(`chatrooms/${roomID}`);
//   const snapshot = await roomRTDBRef.get();
//   const oldMessages = await snapshot.val().messages;
//   if (!oldMessages) {
//     const result = await roomRTDBRef.update({
//       messages: [{ message, username }],
//     });
//   } else {
//     oldMessages.push({ message, username });
//     const result = await roomRTDBRef.update({
//       messages: oldMessages,
//     });
//   }
//   console.log("old2", oldMessages);
//   res.status(200).json({
//     oldMessages,
//   });
// });
