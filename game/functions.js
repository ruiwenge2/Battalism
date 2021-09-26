module.exports.random = function(number1, number2){
  return Math.round(Math.random() * (number2 - number1)) + number1;
}

module.exports.getUser = function(room, id){
  let num = 0;
  for(info of users[room].players){
    if(info.id == id){
      return num;
    } else {
      num ++;
    }
  }
}

module.exports.getRoomOfUser = function(id){
  for(room of Object.keys(users)){
    for(info of users[room].players){
      if(info.id == id){
        return room;
      }
    }
  }
}

module.exports.checkUsername = function(room, user){
  let players = users[room].players;
  for(let i of players){
    if(i.name == user) return false;
  }
  return true;
}

module.exports.userInRooms = function(id){
  for(let room in users){
    for(let info of users[room].players){
      if(id == info.id) return true;
    }
  }
  return false;
}

module.exports.randomDirection = function(){
  let directions = ["left", "right", "up", "down"];
  return directions[module.exports.random(0, directions.length - 1)];
}

module.exports.getAvailableRooms = function(){
  let rooms = [];
  for(let i of Object.keys(users)){
    if(users[i].players.length > 0 && users[i].players.length < 6){
      rooms.push(i);
    }
  }
  return rooms;
}

module.exports.shootArrow = function(user, arrow){
  user.health -= arrow_damage;
  io.to(user.id).emit("hit_by_arrow", arrow.user);
}

module.exports.useSword = function(user){
  
}