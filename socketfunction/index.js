const Room = require("../room");
const { random, getUser, getRoomOfUser, checkUsername, userInRooms } = require("../game/functions");

const socketfunc = socket => {
  socket.on("check", (user, room, weapon, width, height) => {
    if(!(room in users)){
      users[room] = new Room(room);
      users[room].generateRocks();
    }
    if(!user){
      socket.emit("error", "Please enter a username.");
      return socket.disconnect();
    }
    if(!(weapon in weapon_limits)){
      socket.emit("error", "Invalid weapon.");
      return socket.disconnect();
    }
    if(users[room].players.length >= max){
      socket.emit("error", "There are already 6 users in this room, so please join another.");
      return socket.disconnect();
    }
    for(let i of user){
      if(!allchars.includes(i)){
        socket.emit("error", "Username can only contain alphanumeric characters and underscores.");
        return socket.disconnect();
      }
    }
    if(user.length > max_user_length){
      socket.emit("error", "Your username cannot be longer than 15 characters.");
      return socket.disconnect();
    }
    if(!true){ // for now
      socket.emit("error", "Your username has been taken in this room.");
      socket.disconnect();
    } else {
      socket.join(room);
      let id = socket.id;
      users[room].addPlayer(id, user, weapon, width, height);
      console.log(users[room].players[getUser(room, id)]);
      socket.emit("error", false);
      socket.broadcast.to(room).emit("joined", user);
      console.log(users);
      if(users[room].players.length >= 6){
        io.emit("removeroom", room);
      } else if(users[room].players.length == 1){
        io.emit("newroom", room);
      }
    }
    console.log(users[room]);
  });

  socket.on("move", (direction, room) => {
    try {
      users[room].move(direction, socket.id);
    } catch(err){
      console.log(err);
    }
  });

  socket.on("releasekey", room => {
    users[room].release(socket.id);
  });

  socket.on("useweapon", () => {
    users[getRoomOfUser(socket.id)].useWeapon(socket.id);
  });

  socket.on("lost", () => {
    socket.disconnect();
  });

  socket.on("chat message", message => {
    let id = socket.id;
    let room = getRoomOfUser(id);
    let user = users[room].players[getUser(room, id)].name;
    socket.broadcast.to(room).emit("chat message", user, message);
  });

  socket.on("disconnect", () => {
    if(!userInRooms(socket.id)) return;
    console.log("left");
    let room = getRoomOfUser(socket.id);
    users[room].removePlayer(socket.id);
    console.log(users);
    if(users[room].players.length == 0){
      io.emit("removeroom", room);
    } else if(users[room].players.length == 5){
      io.emit("newroom", room);
    }
  });
}

module.exports = socketfunc;