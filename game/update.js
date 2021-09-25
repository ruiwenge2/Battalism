const update = () => {
  setInterval(function(){
    for(room in users){
      io.to(room).emit("gamestate", users[room]);
      users[room].updatePositions();
      users[room].updateWeapons();
    }
  }, 40);
}

module.exports = update;