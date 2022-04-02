const { getUser } = require("../game/functions")

module.exports.checkLeft = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x - speed < 0 + radius) return false;
  for(let i of users[room].players){
    var dx = (info.x - speed) - i.x;
    var dy = info.y - i.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius * 2 && i.id != info.id) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size } = j;
    var dx = (info.x - speed) - x;
    var dy = info.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius + size) return false;
  }
  return true;
}

module.exports.checkRight = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.x + speed > game_width - radius) return false;
  for(let i of users[room].players){
    var dx = (info.x + speed) - i.x;
    var dy = info.y - i.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius * 2 && i.id != info.id) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size } = j;
    var dx = (info.x + speed) - x;
    var dy = info.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius + size) return false;
  }
  return true;
}

module.exports.checkTop = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y - speed < 0 + radius) return false;
  for(let i of users[room].players){
    var dx = info.x - i.x;
    var dy = (info.y - speed) - i.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius * 2 && i.id != info.id) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size } = j;
    var dx = info.x - x;
    var dy = (info.y - speed) - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius + size) return false;
  }
  return true;
}

module.exports.checkBottom = function(room, id){
  var info = users[room].players[getUser(room, id)];
  if(info.y + speed > game_height - radius) return false;
  for(let i of users[room].players){
    var dx = info.x - i.x;
    var dy = (info.y + speed) - i.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius * 2 && i.id != info.id) return false;
  }
  for(let j of users[room].rocks){
    let { x, y, size } = j;
    var dx = info.x - x;
    var dy = (info.y + speed) - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius + size) return false;
  }
  return true;
}

module.exports.checkForGold = function(room, id){
  var info = users[room].players[getUser(room, id)];
  for(let i = 0; i < users[room].gold.length; i++){
    let { x, y, size, value } = users[room].gold[i];
    var dx = info.x - x;
    var dy = info.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if(distance < radius + size) return { value:value, index:i };
  }
  return false;
}