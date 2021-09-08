const Room = require("./room");
const { random } = require("../functions");

const socketfunc = socket => {
  socket.on("check", (user, room) => {
    if(!(room in global.users)){
      global.users[room] = new Room();
    }
    if(global.users[room].players.length >= 6){
      socket.emit("toomanyplayers");
      console.log("toomanyplayers");
      return;
    }
    if(user in global.users[room].players){
      socket.emit("usernametaken");
    } else {
      socket.join(room);
      let id = socket.id;
      global.users[room].addPlayer(id, user);
      socket.emit("usernamevalid");
      socket.broadcast.to(room).emit("joined", user);
    }
    console.log(global.users[room]);
  });
  socket.on("disconnect", () => {
    
  });
}

module.exports = socketfunc;