function update(data){
  c.clearRect(0, 0, canvas.width, canvas.height);
  let players = data.players;
  for(let info of players){
    c.beginPath();
    c.arc(info.x, info.y, 37.5, 0, 2 * Math.PI);
    c.stroke();
  }
}