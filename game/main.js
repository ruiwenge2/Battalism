const express = require("express");
const app = express();
const server = require("http").Server(app);
global.io = require("socket.io")(server, {
  allowRequest: (req, callback) => {
    callback(null, req.headers.origin === undefined);
  }
});
app.use(express.static("public"));

const socketfunc = require("../socketfunction");
const update = require("./update");
const { getAvailableRooms } = require("./functions");
require("../config");
var __dirname = "/home/runner/Game";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/game", (req, res) => {
  res.redirect("/");
});

app.get("/howtoplay", (req, res) => {
  res.sendFile(__dirname + "/public/howtoplay.html");
});

app.get("/game/:room", (req, res) => {
  res.sendFile(__dirname + "/public/game.html");
});

app.get("/rooms", (req, res) => {
  res.json(getAvailableRooms());
});

io.on("connection", socketfunc);
update();

server.listen(3000, () => {
  console.log("server started");
});