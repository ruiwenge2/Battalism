const update = () => {
  setInterval(function(){
    for(room in users){
      users[room].updatePositions();
      users[room].updateWeapons();
      io.to(room).emit("gamestate", users[room]);
    }
  }, 40);
}

module.exports = update;