function update(data){
  c.clearRect(0, 0, canvas.width, canvas.height);
  usersdiv.innerHTML = "";
  document.querySelector("#players h1").innerHTML = "Players";
  drawMap(data);
  sortPlayers(data);
  let { lines, players, rocks, swords, arrows, gold } = changeView(data);
  let place = 1;

  for(let info of lines){
    c.beginPath();
    c.moveTo(info.first[0], info.first[1]);
    c.lineTo(info.next[0], info.next[1]);
    c.lineWidth = "1";
    c.strokeStyle = "white";
    c.stroke();
  }
  for(let info of rocks){
    let { x, y, size } = info;
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI);
    c.fillStyle = "gray";
    c.strokeStyle = "#5f6661";
    c.lineWidth = "3";
    c.fill();
    c.stroke();
  }
  for(let info of gold){
    let { value, x, y, size } = info;
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI);
    c.fillStyle = "gold";
    c.strokeStyle = "goldenrod";
    c.lineWidth = "3";
    c.fill();
    c.stroke();
    c.fillStyle = "black";
    c.font = "14px Arial";
    c.fillText(value, x, y);
  }
  for(let info of players){
    c.beginPath();
    c.arc(info.x, info.y, radius, 0, 2 * Math.PI);
    c.fillStyle = "#e3ba7f";
    c.fill();
    c.strokeStyle = "black";
    c.lineWidth = "2";
    c.stroke();
    c.fillStyle = "black";
    c.font = "14px Arial";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(info.name, info.x, info.y);
    usersdiv.innerText += `${place}. ${info.name}, ${info.health} health`;
    usersdiv.innerHTML += "<br>";
    place++;
  }
  for(let arrow of arrows){
    c.beginPath();
    c.moveTo(arrow.xbefore, arrow.ybefore);
    c.lineTo(arrow.x, arrow.y);
    c.strokeStyle = "black";
    c.lineWidth = "1";
    c.stroke();
  }
  for(let sword of swords){
    c.beginPath();
    c.moveTo(sword.xbefore, sword.ybefore);
    c.lineTo(sword.x, sword.y);
    c.lineWidth = "5";
    c.strokeStyle = "dimgray";
    c.stroke();
  }
}
