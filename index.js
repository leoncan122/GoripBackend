const express = require("express");
const cors = require("cors");
const main = require("./src/database/connectBD");
const spots = require("./src/routes/routesSpots");
const auth = require("./src/routes/authRoutes");
const { Server } = require("socket.io");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

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

server.listen(4000, () => {
  console.log("App is running on port 4000");
});
