const { getUser } = require("../functions")

module.exports.checkLeft = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x - speed < 0 + radius) return false;
  for(let i of users[room].players){
    if(info.x - speed - radius < i.x + radius && info.x - speed - radius > i.x - radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  return true;
}

module.exports.checkRight = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x + speed > info.cwidth - radius) return false;
  for(let i of users[room].players){
    if(info.x + speed + radius > i.x - radius && info.x + speed + radius < i.x + radius && info.y + radius > i.y - radius && info.y - radius < i.y + radius) return false;
  }
  return true;
}

module.exports.checkTop = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y - speed < 0 + radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x + radius > i.x - radius && info.y - speed - radius < i.y + radius && info.y - speed - radius > i.y - radius) return false;
  }
  return true;
}

module.exports.checkBottom = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y + speed > info.cheight - radius) return false;
  for(let i of users[room].players){
    if(info.x + radius > i.x - radius && info.x + radius > i.x - radius && info.y + speed + radius > i.y - radius && info.y + speed + radius < i.y + radius) return false;
  }
  return true;
}
