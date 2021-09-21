const update = () => {
  setInterval(function(){
    for(room in users){
      users[room].updatePositions();
      io.to(room).emit("gamestate", users[room]);
      for(let i = 0; i < users[room].arrows.length; i++){
        users[room].arrows[i].update();
      }
    }
  }, 40);
}

module.exports = update;