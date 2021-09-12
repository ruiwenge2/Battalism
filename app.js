const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("public"));

const socketfunc = require("./game/socketfunction");
const update = require("./game/update");

global.io = io;
global.users = {};
global.max = 6;
global.speed = 11;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/game", (req, res) => {
  res.redirect("/");
});

app.get("/game/:room", (req, res) => {
  res.sendFile(__dirname + "/public/game.html");
});

io.on("connection", socketfunc);
update();

server.listen(3000);