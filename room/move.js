const { getUser } = require("../game/functions")

module.exports.checkLeft = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x - speed < 0) return false;
  for(let i of users[room].players){
    if(info.x - speed - radius < i.x + radius && info.x - speed - radius > i.x - radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x - speed - radius < x + size && info.x - speed - radius > x - size && info.y + radius > y - size && info.y - radius < y + size) return false;
  }
  return true;
}

module.exports.checkRight = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x + speed > game_width) return false;
  for(let i of users[room].players){
    if(info.x + speed + radius > i.x - radius && info.x + speed + radius < i.x + radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + speed + radius > x - size && info.x + speed + radius < x + size && info.y + radius > y - size && info.y - radius < y + size) return false;
  }
  return true;
}

module.exports.checkTop = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y - speed < 0) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x - radius < i.x + radius && info.y - speed - radius < i.y + radius && info.y - speed - radius > i.y - radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x - radius < x + size && info.y - speed - radius < y + size && info.y - speed - radius > y - size) return false;
  }
  return true;
}

module.exports.checkBottom = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y + speed > game_height) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x - radius < i.x + radius && info.y + speed + radius > i.y - radius && info.y + speed + radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x - radius < x + size && info.y + speed + radius > y - size && info.y + speed + radius < y + size) return false;
  }
  return true;
}
