const socket = io();
const allrooms = document.getElementById("rooms");

async function showRooms(){
  let rooms = await fetch("/rooms");
  rooms = await rooms.json();
  for(let i of rooms){
    let a = document.createElement("a");
    a.innerText = i;
    a.href = "/game/" + i;
    a.id = "room_" + i;
    a.className = "room-name";
    allrooms.appendChild(a);
  }
  if(document.getElementsByClassName("room-name").length == 0){
    change("block");
  }
}

showRooms();

function join(){
  let room = document.getElementById("room").value;
  let username = document.getElementById("username").value;
  let weapon = document.getElementById("weapons").value;
  localStorage.setItem("username", username);
  localStorage.setItem("weapon", weapon == "Sword" ? "sword": "arrow");
  location.href += "/game/" + room;
}

function change(style){
  document.getElementById("no-room-message").style.display = style;
}

socket.on("newroom", room => {
  let a = document.createElement("a");
  a.innerText = room;
  a.href = "/game/" + room;
  a.id = "room_" + room;
  a.className = "room-name";
  allrooms.appendChild(a);
  allrooms.scrollTo(0, allrooms.scrollHeight);
  change("none");
});

socket.on("removeroom", room => {
  document.getElementById("room_" + room).remove();
  if(document.getElementsByClassName("room-name").length == 0){
    change("block");
  }
});