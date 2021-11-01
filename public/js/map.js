function drawMap(data){
  const ratio = 2000 / map.width;
  m.clearRect(0, 0, map.width, map.height);
  let { rocks, players, gold } = data;

  for(let info of rocks){
    let { x, y, size } = info;
    m.beginPath();
    m.arc(x / ratio, y / ratio, size / ratio, 0, 2 * Math.PI);
    m.fillStyle = "gray";
    m.fill();
  }
  for(let info of gold){
    let { x, y, size } = info;
    m.beginPath();
    m.arc(x / ratio, y / ratio, size / ratio, 0, 2 * Math.PI);
    m.fillStyle = "gold";
    m.fill();
  }
  for(let info of players){
    m.beginPath();
    m.arc(info.x / ratio, info.y / ratio, radius / ratio, 0, 2 * Math.PI);
    if(info.id == socket.id){
      m.fillStyle = "red";
    } else {
      m.fillStyle = "blue";
    }
    m.fill();
  }
}