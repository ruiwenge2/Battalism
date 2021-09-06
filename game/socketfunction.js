const Room = require("./room");

const socketfunc = socket => {
  socket.on("check", (user, room) => {
    
  });
  socket.on("disconnect", () => {
    
  });
}

module.exports = socketfunc;