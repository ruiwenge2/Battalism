const { random, getUser, randomDirection } = require("./functions");
const { checkLeft, checkRight, checkTop, checkBottom } = require("./move");

class Room {
  constructor(room){
    this.players = [];
    this.room = room;
    this.rocks = [];
  }
  addPlayer(id, user, weapon, width, height){
    this.players.push({
      id:id,
      name:user,
      x:random(radius, width - radius),
      y:random(radius, height - radius),
      weapon:weapon,
      health:100,
      cwidth:width,
      cheight:height,
      direction:"none",
      side:randomDirection(),
      times:weapon_limits[weapon]
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
    this.players[getUser(this.room, id)].direction = direction;
    this.players[getUser(this.room, id)].side = direction;
  }
  release(id){
    this.players[getUser(this.room, id)].direction = "none";
  }
}
module.exports = Room;