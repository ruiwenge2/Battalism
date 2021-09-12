const { random, getUser } = require("../functions");

class Room {
  constructor(room){
    this.players = [];
    this.room = room;
    this.rocks = [];
  }
  addPlayer(id, user){
    this.players.push({
      id:id,
      name:user,
      x:0,
      y:200,
      weapon:null,
      health:100
    });
  }
  removePlayer(id){
    this.players.splice(getUser(this.room, id), 1);
  }
  generateRocks(){
    
  }
  move(direction, id){
      console.log(direction);
    switch(direction){
      case "right":
        this.players[getUser(this.room, id)].x += speed;
        break;
      case "left":
        this.players[getUser(this.room, id)].x -= speed;
        break;
      case "up":
        this.players[getUser(this.room, id)].y -= speed;
        break;
      case "down":
        this.players[getUser(this.room, id)].y += speed;
        break;
    }
    // console.log(this);
  }
}
module.exports = Room;