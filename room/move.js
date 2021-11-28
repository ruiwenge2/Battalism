const { getUser } = require("../game/functions")

module.exports.checkLeft = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x - speed < 0 + radius) return false;
  for(let i of users[room].players){
    if(info.x - radius - speed < i.x + radius && info.x - radius - speed > i.x - radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x - radius - speed < x + size && info.x - radius - speed > x - size && info.y + radius > y - size && info.y - radius < y + size) return false;
  }
  return true;
}

module.exports.checkRight = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x + speed > game_width - radius) return false;
  for(let i of users[room].players){
    if(info.x + radius + speed > i.x - radius && info.x + radius + speed < i.x + radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius + speed > x - size && info.x + radius + speed < x + size && info.y + radius > y - size && info.y - radius < y + size) return false;
  }
  return true;
}

module.exports.checkTop = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y - speed < 0 + radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x - radius < i.x + radius && info.y - radius - speed < i.y + radius && info.y - radius - speed > i.y - radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x - radius < x + size && info.y - radius - speed < y + size && info.y - radius - speed > y - size) return false;
  }
  return true;
}

module.exports.checkBottom = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y + speed > game_height - radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x - radius < i.x + radius && info.y + radius + speed > i.y - radius && info.y + radius + speed < i.y + radius) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size} = j;
    if(info.x + radius > x - size && info.x - radius < x + size && info.y + radius + speed > y - size && info.y + radius + speed < y + size) return false;
  }
  return true;
}

module.exports.checkForGold = function(room, id){
  var info = users[room].players[getUser(room, id)];
  for(let i = 0; i < users[room].gold.length; i++){
    let { x, y, size, value } = users[room].gold[i];
    if(x - size < info.x + radius &&
      x + size > info.x -  radius &&
      y - size < info.y + radius &&
      y + size > info.y - radius){
      return { value:value, index:i };
    }
  }
  return false;
}