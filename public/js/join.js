const socket = io();
const allrooms = document.getElementById("rooms");
let username = localStorage.getItem("username");
let weapon = localStorage.getItem("weapon");
let room = localStorage.getItem("room");
if(username){
  document.getElementById("username").value = username;
}
if(room){
  document.getElementById("room").value = room;
}
if(weapon == "arrow"){
  document.getElementById("weapons").value = "Bow and Arrows";
}

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
    change("no");
  }
}

showRooms();

function join(){
  let username = document.getElementById("username").value;
  let room = document.getElementById("room").value;
  let weapon = document.getElementById("weapons").value;
  localStorage.setItem("username", username);
  localStorage.setItem("weapon", weapon == "Sword" ? "sword": "arrow");
  location.href = "/game/" + room;
}

function change(text){
  if(text == "yes") document.getElementById("roomslist-title").innerHTML = "Join these rooms! There are already players in them!";
  if(text == "no"){
    document.getElementById("roomslist-title").innerHTML = "Sorry, no one is online. Try joining a room!";
  }
}

socket.on("newroom", room => {
  let a = document.createElement("a");
  a.innerText = room;
  a.href = "/game/" + room;
  a.id = "room_" + room;
  a.className = "room-name";
  allrooms.appendChild(a);
  allrooms.scrollTo(0, allrooms.scrollHeight);
  change("yes");
});

socket.on("removeroom", room => {
  document.getElementById("room_" + room).remove();
  if(document.getElementsByClassName("room-name").length == 0){
    change("no");
  }
});