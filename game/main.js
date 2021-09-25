const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("public"));

const socketfunc = require("./socketfunction");
const update = require("./update");
const { getAvailableRooms } = require("./functions");
var __dirname = "/home/runner/Game";

global.io = io;
global.users = {};
global.max = 6;
global.speed = 8;
global.radius = 37.5;
global.min_rock_size = 20;
global.max_rock_size = 100;
global.rock_boundary = 1500;
global.arrow_speed = 50;
global.sword_length = 30;
global.weapon_limits = { sword:12, arrow:15 };
global.arrow_damage = 15;
global.sword_damage = 25;
global.weapon_interval = 25;
global.arrow_length = 40;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/game", (req, res) => {
  res.redirect("/");
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