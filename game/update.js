const update = () => {
  setInterval(function(){
    for(room in users){
      users[room].updatePositions();
      io.to(room).emit("gamestate", users[room]);
    }
  }, 40);
}

module.exports = update;