window.onblur = function(){
  focus = false;
}
window.onfocus = function(){
  focus = true;
}

function chat(){
  chatbox.style.display = "block";
  input.focus();
  canvas_focused = false;
}
function closeChat(){
  chatbox.style.display = "none";
}

input.addEventListener("keydown", e => {
  if(e.key == "Enter") sendMessage();
});

function sendMessage(){
  if(!validMessage(input.value)) return;
  socket.emit("chat message", input.value);
  input.value = "";
  input.focus();
}

socket.on("chat message", (username, message) => {
  if(!focus){
    document.getElementById("chat-alert").play();
  }
  messages.innerHTML += `<p>${username}: ${encodeHTML(message)}</p>`;
  messages.scrollTo(0, messages.scrollHeight);
})

function encodeHTML(text){
  var div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

function validMessage(message){
  if(!message) return false;
  for(var i of message){
    if(i != " ") return true;
  }
  return false;
}