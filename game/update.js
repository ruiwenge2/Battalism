const update = () => {
  setInterval(function(){
    for(room in users){
      io.to(room).emit("gamestate", users[room]);
      users[room].updatePositions();
      users[room].updateWeapons();
    }
  }, 1000 / 30);
}

module.exports = update;