function join(){
  let room = document.getElementById("room").value;
  let username = document.getElementById("username").value;
  localStorage.setItem("username", username)
  location.href += "/game/" + room;
}