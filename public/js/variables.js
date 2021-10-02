const room = location.href.split("/game/")[1];
const user = localStorage.getItem("username");
const weapon = localStorage.getItem("weapon");
const socket = io();
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const usersdiv = document.getElementById("players-main");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 11;
const radius = 30;
const arrow_length = 40;

localStorage.setItem("room", room);