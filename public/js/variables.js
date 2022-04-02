const room = location.href.split("/game/")[1];
const user = localStorage.getItem("username");
var weapon = localStorage.getItem("weapon");
const socket = io();
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const map = document.getElementById("map");
const m = map.getContext("2d");
const usersdiv = document.getElementById("players-main");
const chatbox = document.getElementById("chatbox");
const input = document.getElementById("chat-input");
const messages = document.getElementById("messages");
var focus = true;
var prevent = false;
var canvas_focused = true;
var chat_opened = false;
var new_messages = 0;
var full_screen = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
map.width = 160;
map.height = 160;

const radius = 30;
const arrow_length = 50;

localStorage.setItem("room", room);