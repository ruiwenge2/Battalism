socket.emit("check", user, room, weapon);

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

socket.on("timesleft", async num => {
  if(weapon == "arrow"){
    await showMessage(`Arrows left: ${num}`, 1);
  } else {
    await showMessage(`Times left to use your sword: ${num}`, 1);
  }
});

socket.on("moretimes", async (num, total) => {
  times = "";
  if(num > 1) times += "s";
  if(weapon == "arrow"){
    showMessage(`You got ${num} more arrow${times}`, 1);
    showMessage2(`Arrows: ${total}`, 1);
  } else {
    showMessage(`You got ${num} more time${times} to use your sword`, 1);
    showMessage2(`Times to use your sword: ${total}`, 1);
  }
});

socket.on("weaponswitch", async (weaponname, text) => {
  localStorage.setItem("weapon", weaponname);
  weapon = weaponname;
  await showMessage(`You weapon has been switched to ${text}.`, 1);
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
  let key = e.key.toLowerCase();
  if(key == "arrowright" || key == "d"){
    socket.emit("move", "right", room);
  }
  else if(key == "arrowleft" || key == "a"){
    socket.emit("move", "left", room);
  }
  else if(key == "arrowup" || key == "w"){
    socket.emit("move", "up", room);
  }
  else if(key == "arrowdown" || key == "s"){
    socket.emit("move", "down", room);
  }
});

document.addEventListener("keyup", e => {
  socket.emit("releasekey", room);
});

window.addEventListener("click", e => {
  if(e.target == document.getElementById("chatbox") || e.target == document.getElementById("chat-btn") || e.target == document.getElementById("switch-weapon") || e.target == input || e.target == document.getElementById("send") || e.target == document.getElementById("close-chat")) return;
  if(!focus) return;
  var angle = Math.atan2(e.clientY - (canvas.height / 2), e.clientX - (canvas.width / 2));
  socket.emit("useweapon", angle);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function switchWeapon(){
  socket.emit("switchweapon", room);
}

showMessage("Loading...", 1);