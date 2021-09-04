const room = location.href.split("/game/")[1];
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c.fillStyle = "#4287f5";
c.fillRect(0, 0, canvas.width, canvas.height);

