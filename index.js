const express = require("express");
const cors = require("cors");
const main = require("./src/database/connectBD");
const spots = require("./src/routes/routesSpots");
const auth = require("./src/routes/authRoutes");
const { Server } = require("socket.io");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();

const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: [
      "https://gorip.fun",
      "localhost:4200",
      "https://goripp.herokuapp.com",
    ],
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": ["GET", "PUT", "POST", "DELETE"],
  "Access-Control-Allow-Headers": ["Authorization"],
};
app.use(cors(corsOptions));

app.use(fileUpload());
app.use(express.json());
//conectamos la BD
main();

app.use("/api/spots", spots);
app.use("/api/user", auth);

//socket
io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("position", (arrayCoords) => {
    const user = {
      id: socket.id,
      latitude: arrayCoords[0],
      longitude: arrayCoords[1],
    };
    // emit the position to the other users excluding me
    socket.broadcast.emit("sharingPosition", user);
  });
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });
  socket.on("unsubscribe", (roomId) => {
    socket.leave(roomId);
    socket.in(roomId).emit("msg-room", {
      from: socket.id,
      msg: "Ha dejado la conversacion, Adios",
    });
  });
  socket.on("room", ({ roomId, msg }) => {
    // if (!msg) {
    //   return socket
    //     .to(roomId)
    //     .emit("user-connected", { id: "user connected " });
    // }

    return socket.in(roomId).emit("msg-room", { from: socket.id, msg: msg });
  });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
