const express = require("express");
const cors = require("cors");
const main = require("./src/database/connectBD");
const spots = require("./src/routes/routesSpots");
const auth = require("./src/routes/authRoutes");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4200", process.env.FRONT_ORIGIN],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": ["GET", "PUT", "POST", "DELETE"],
  "Access-Control-Allow-Headers": ["Authorization"],
};
app.use(cors(corsOptions));

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
});
const PORT = process.env.PORT | 80;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
