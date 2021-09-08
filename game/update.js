const update = () => {
  setInterval(function(){
    for(room in global.users){
      global.io.to(room).emit("gamestate", global.users[room]);
    }
  }, 30);
}

module.exports = update;