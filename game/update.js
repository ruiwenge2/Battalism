const { random, getUser, randomDirection } = require("./functions");
const { checkLeft, checkRight, checkTop, checkBottom } = require("./move");

const update = () => {
  setInterval(function(){
    for(room in global.users){
      for(let user of users[room].players){
        switch(user.direction){
          case "right":
            if(checkRight(users[room].room, user.id)) users[room].players[getUser(users[room].room, user.id)].x += speed;
            break;
          case "left":
            if(checkLeft(users[room].room, user.id)) users[room].players[getUser(users[room].room, user.id)].x -= speed;
            break;
          case "up":
            if(checkTop(users[room].room, user.id)) users[room].players[getUser(users[room].room, user.id)].y -= speed;
            break;
          case "down":
            if(checkBottom(users[room].room, user.id)) users[room].players[getUser(users[room].room, user.id)].y += speed;
            break;
        }
      }
      io.to(room).emit("gamestate", users[room]);
    }
  }, 40);
}

module.exports = update;