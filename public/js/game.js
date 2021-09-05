import { showMessage } from "./functions.js";

const room = location.href.split("/game/")[1];
const user = localStorage.getItem("username");

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var x = 0;
var y = 200;
var change = 9;

c.beginPath();
c.arc(x, y, 37.5, 0, 2 * Math.PI);
c.stroke();

document.addEventListener("keydown", e => {
  if(e.key == "ArrowRight" || e.key == "d"){
    x += change;
  }
  else if(e.key == "ArrowLeft" || e.key == "a"){
    x -= change;
  }
  else if(e.key == "ArrowUp" || e.key == "w"){
    y -= change;
  }
  else if(e.key == "ArrowDown" || e.key == "s"){
    y += change;
  }
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.arc(x, y, 37.5, 0, 2 * Math.PI);
  c.stroke();
});