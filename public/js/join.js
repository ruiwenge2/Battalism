function join(){
  let room = document.getElementById("room").value;
  let username = document.getElementById("username").value;
  let weapon = document.getElementById("weapons").value;
  localStorage.setItem("username", username);
  localStorage.setItem("weapon", weapon == "Sword" ? "sword": "arrow");
  location.href += "/game/" + room;
}