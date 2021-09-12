const update = () => {
  setInterval(function(){
    for(room in global.users){
      io.to(room).emit("gamestate", users[room]);
    }
  }, 30);
}

module.exports = update;