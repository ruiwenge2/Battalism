function random(number1, number2){
  return Math.round(Math.random() * (number2 - number1)) + number1;
}

function getUser(room, id){
  let num = 0;
  for(info of global.users[room].players){
    if(info.id == id){
      return num;
    } else {
      num ++;
    }
  }
}

function getRoomOfUser(id){
  for(room of Object.keys(global.users)){
    for(info of global.users[room].players){
      if(info.id == id){
        return room;
      }
    }
  }
}

module.exports = {
  random:random,
  getUser:getUser,
  getRoomOfUser:getRoomOfUser
}