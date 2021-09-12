const update = () => {
  setInterval(function(){
    for(room in global.users){
      io.to(room).emit("gamestate", users[room]);
    }
  }, 3);
}

module.exports = update;