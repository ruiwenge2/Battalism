socket.emit("check", user, room, weapon, canvas.width, canvas.height);

socket.on("gamestate", update);

socket.on("error", err => {
  if(!err) return;
  else alertmodal("", err).then(() => location.href = "/");
});

socket.on("hit_by_arrow", async user => {
  await showMessage2(`${user} shot you with an arrow.`, 2);
});

socket.on("hit_by_sword", async user => {
  await showMessage2(`${user} stabbed you with a sword.`, 1);
});

socket.on("arrow_hit", async user => {
  await showMessage2(`You shot ${user}.`, 1);
});

socket.on("sword_hit", async user => {
  await showMessage2(`You stabbed ${user}.`, 1);
});

socket.on("timesleft", async (num, weapon) => {
  if(weapon == "arrow"){
    await showMessage(`Arrows left: ${num}`, 1);
  } else {
    await showMessage(`Times left to use your sword: ${num}`, 1);
  }
});

socket.on("noweapon", async message => {
  await showMessage(message, 1);
});

socket.on("lost", async () => {
  socket.emit("lost");
  await showMessage3(`You lost all your health.<br><br><button onclick="location.href = '/'">OK</button>`);
});

document.addEventListener("keydown", e => {
  if(document.activeElement == input) return;
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
});

document.addEventListener("keyup", e => {
  socket.emit("releasekey", room);
});

canvas.addEventListener("click", e => {
  var angle = Math.atan2(e.clientY - (canvas.height / 2), e.clientX - (canvas.width / 2));
  socket.emit("useweapon", angle);
});

showMessage("Loading...", 1);