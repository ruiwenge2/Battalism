const Room = require("./room");
const { random, getUser, getRoomOfUser, checkUsername, userInRooms } = require("./functions");

const socketfunc = socket => {
  socket.on("check", (user, room, weapon, width, height) => {
    if(!(room in users)){
      users[room] = new Room(room);
      users[room].generateRocks();
    }
    if(!user){
      socket.emit("error", "Please enter a username.");
      return;
    }
    if(!(weapon in weapon_limits)){
      socket.emit("error", "Invalid weapon.");
      return;
    }
    if(users[room].players.length >= max){
      socket.emit("error", "There are already 6 users in this room, so please join another.");
      return;
    }
    if(!true){ // for now
      socket.emit("error", "Your username has been taken in this room.");
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
    users[room].move(direction, socket.id);
  });

  socket.on("releasekey", room => {
    users[room].release(socket.id);
  });

  socket.on("useweapon", () => {
    users[getRoomOfUser(socket.id)].useWeapon(socket.id);
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