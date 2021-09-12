if(!user){
  alertmodal("", "Please enter a username").then(() => location.href = "/");
}

socket.emit("check", user, room);

socket.on("gamestate", update);

socket.on("error", err => {
  if(!err) return;
  else alertmodal("", err);
});

document.addEventListener("keydown", e => {
  if(e.key == "ArrowRight" || e.key == "d"){
    socket.emit("move", "right", room);
  }
  else if(e.key == "ArrowLeft" || e.key == "a"){
    socket.emit("move", "left", room);
  }
  else if(e.key == "ArrowUp" || e.key == "w"){
    socket.emit("move", "up", room);
  }
  else if(e.key == "ArrowDown" || e.key == "s"){
    socket.emit("move", "down", room);
  }
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.arc(x, y, 37.5, 0, 2 * Math.PI);
  c.stroke();
});