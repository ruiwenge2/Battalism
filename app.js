const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const socketfunc = require("./game/socketfunction");
const update = require("./game/update");

global.io = io;
global.users = {};
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/game/:room", (req, res) => {
  res.sendFile(__dirname + "/public/game.html");
});

io.on("connection", socketfunc);

server.listen(3000);