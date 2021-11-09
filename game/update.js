const update = () => {
  setInterval(function(){
    for(room in users){
      io.to(room).emit("gamestate", users[room]);
      users[room].updatePositions();
      users[room].updateWeapons();
    }
  }, 20);
}

module.exports = update;