const Room = require("./room");
const { random, getUser, getRoomOfUser } = require("../functions");

const socketfunc = socket => {
  socket.on("check", (user, room) => {
    if(!(room in global.users)){
      global.users[room] = new Room(room);
    }
    if(global.users[room].players.length >= 6){
      socket.emit("error", "There are already 6 users in this room, so please join another.");
      console.log("error");
      return;
    }
    if(user in global.users[room].players){
      socket.emit("error", "Your username has been taken in this room");
    } else {
      socket.join(room);
      let id = socket.id;
      global.users[room].addPlayer(id, user);
      console.log(global.users[room].players[getUser(room, id)]);
      socket.emit("usernamevalid");
      socket.broadcast.to(room).emit("joined", user);
    console.log(global.users);
    }
    console.log(global.users[room]);
  });
  socket.on("disconnect", () => {
    console.log("left");
    global.users[getRoomOfUser(socket.id)].removePlayer(socket.id);
    console.log(global.users);
  });
}

module.exports = socketfunc;