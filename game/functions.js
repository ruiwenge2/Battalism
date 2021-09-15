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