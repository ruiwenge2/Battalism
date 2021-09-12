const { getUser } = require("../functions")

module.exports.checkLeft = function(room, id){
  let info = users[room].players[getUser(room, id)];
  if(info.x - speed < 0 + radius) return false;
  return true;
}

module.exports.checkRight = function(room, id){
  let info = users[room].players[getUser(room, id)];
  if(info.x + speed > info.cwidth - radius) return false;
  return true;
}

module.exports.checkTop = function(room, id){
  let info = users[room].players[getUser(room, id)];
  if(info.y - speed < 0 + radius) return false;
  return true;
}

module.exports.checkBottom = function(room, id){
  let info = users[room].players[getUser(room, id)];
  if(info.y + speed > info.cheight - radius) return false;
  return true;
}