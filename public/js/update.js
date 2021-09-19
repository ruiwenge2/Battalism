function update(data){
  c.clearRect(0, 0, canvas.width, canvas.height);
  usersdiv.innerHTML = "";
  document.querySelector("#players h1").innerHTML = "Players";
  let { players, rocks } = data;
  for(let info of rocks){
    let [x, y, size] = info;
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI);
    c.fillStyle = "gray";
    c.fill();
  }
  for(let info of players){
    c.beginPath();
    c.arc(info.x, info.y, radius, 0, 2 * Math.PI);
    c.fillStyle = "black";
    c.fill();
    c.stroke();
    c.fillStyle = "white";
    c.font = "14px Arial";
    c.fillText(info.name, info.x - info.name.length * 3, info.y);
    usersdiv.innerText += `${info.name}, ${info.health} health`;
    usersdiv.innerHTML += "<br>";
  }
}