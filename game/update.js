const update = () => {
  setInterval(function(){
    for(room in users){
      users[room].updatePositions();
      io.to(room).emit("gamestate", users[room]);
      for(let i = 0; i < users[room].players.length; i++){
        if(users[room].players[i].timeleft > 0){
          users[room].players[i].timeleft--;
        } else if(users[room].players[i].timeleft == 0){
          users[room].players[i].useweapon = true;
        }
      }

      for(let i = 0; i < users[room].arrows.length; i++){
        users[room].arrows[i].update();
      }
    }
  }, 40);
}

module.exports = update;