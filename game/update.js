const update = () => {
  setInterval(function(){
    for(room in users){
      try {
        io.to(room).emit("gamestate", users[room]);
        users[room].updatePositions();
        users[room].updateWeapons();
      } catch(e){}
    }
  }, 20);
}

module.exports = update;