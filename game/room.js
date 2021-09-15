const { random, getUser } = require("./functions");
const { checkLeft, checkRight, checkTop, checkBottom } = require("./move");

class Room {
  constructor(room){
    this.players = [];
    this.room = room;
    this.rocks = [];
  }
  addPlayer(id, user, width, height){
    this.players.push({
      id:id,
      name:user,
      x:random(radius, width - radius),
      y:random(radius, height - radius),
      weapon:null,
      health:100,
      cwidth:width,
      cheight:height
    });
  }
  removePlayer(id){
    this.players.splice(getUser(this.room, id), 1);
  }
  generateRocks(){
    for(let i = 0; i < random(5, 20); i++){
      let size = random(min_rock_size / 2, max_rock_size / 2);
      let x = random(size, rock_boundary - size);
      let y = random(size, rock_boundary - size);
      this.rocks.push([x, y, size]);
    }
  }
  move(direction, id){
    console.log(direction);
    switch(direction){
      case "right":
        if(checkRight(this.room, id)) this.players[getUser(this.room, id)].x += speed;
        break;
      case "left":
        if(checkLeft(this.room, id)) this.players[getUser(this.room, id)].x -= speed;
        break;
      case "up":
        if(checkTop(this.room, id)) this.players[getUser(this.room, id)].y -= speed;
        break;
      case "down":
        if(checkBottom(this.room, id)) this.players[getUser(this.room, id)].y += speed;
        break;
    }
  }
}
module.exports = Room;