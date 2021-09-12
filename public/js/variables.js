const room = location.href.split("/game/")[1];
const user = localStorage.getItem("username");
const socket = io();
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 11;
const radius = 37.5;