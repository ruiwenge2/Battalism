const { getUser } = require("../game/functions")

module.exports.checkLeft = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x < 0 + radius) return false;
  for(let i of users[room].players){
    if(info.x - radius < i.x + radius && info.x - radius > i.x - radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x - radius < x + size && info.x - radius > x - size && info.y + radius > y - size && info.y - radius < y + size) return false;
  }
  return true;
}

module.exports.checkRight = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x > game_width - radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x + radius < i.x + radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x + radius < x + size && info.y + radius > y - size && info.y - radius < y + size) return false;
  }
  return true;
}

module.exports.checkTop = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y < 0 + radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x - radius < i.x + radius && info.y - radius < i.y + radius && info.y - radius > i.y - radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x - radius < x + size && info.y - radius < y + size && info.y - radius > y - size) return false;
  }
  return true;
}

module.exports.checkBottom = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y > game_height - radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x - radius < i.x + radius && info.y + radius > i.y - radius && info.y + radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x - radius < x + size && info.y + radius > y - size && info.y + radius < y + size) return false;
  }
  return true;
}
