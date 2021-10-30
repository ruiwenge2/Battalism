function update(data){
  c.clearRect(0, 0, canvas.width, canvas.height);
  usersdiv.innerHTML = "";
  document.querySelector("#players h1").innerHTML = "Players";
  let { lines, players, rocks, swords, arrows } = changeView(data);

  for(let info of lines){
    c.beginPath();
    c.moveTo(info.first[0], info.first[1]);
    c.lineTo(info.next[0], info.next[1]);
    c.stroke();
    console.log(lines)
  }
  for(let info of rocks){
    let { x, y, size } = info;
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
    c.fillText(info.name, info.x - info.name.length * 3.5, info.y);
    usersdiv.innerText += `${info.name}, ${info.health} health`;
    usersdiv.innerHTML += "<br>";
  }
  for(let arrow of arrows){
    c.beginPath();
    c.moveTo(arrow.xbefore, arrow.ybefore);
    c.lineTo(arrow.x, arrow.y);
    c.stroke();
  }
  for(let sword of swords){
    c.beginPath();
    c.moveTo(sword.x, sword.y);
    let direction = sword.direction;
    if(direction == "left"){
      c.lineTo(sword.x - arrow_length, sword.y);
    } else if(direction == "right"){
      c.lineTo(sword.x + arrow_length, sword.y);
    } else if(direction == "up"){
      c.lineTo(sword.x, sword.y - arrow_length);
    } else if(direction == "down"){
      c.lineTo(sword.x, sword.y + arrow_length);
    }
    c.stroke();
  }
}