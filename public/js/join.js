function join(){
  let room = document.querySelector("input").value;
  location.href += "/game/" + room;
}