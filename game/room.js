const { random, getUser, randomDirection } = require("./functions");
const { checkLeft, checkRight, checkTop, checkBottom } = require("./move");
const { Sword, Arrow } = require("./weapon");

class Room {
  constructor(room){
    this.players = [];
    this.room = room;
    this.rocks = [];
    this.swords = [];
    this.arrows = [];
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
      times:weapon_limits[weapon],
      useweapon:true,
      timeleft:0
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
  updatePositions(){
    for(let user of this.players){
      switch(user.direction){
        case "right":
          if(checkRight(this.room, user.id)) this.players[getUser(this.room, user.id)].x += speed;
          break;
        case "left":
          if(checkLeft(this.room, user.id)) this.players[getUser(this.room, user.id)].x -= speed;
          break;
        case "up":
          if(checkTop(this.room, user.id)) this.players[getUser(this.room, user.id)].y -= speed;
          break;
        case "down":
          if(checkBottom(this.room, user.id)) this.players[getUser(this.room, user.id)].y += speed;
          break;
      }
    }
  }
  useWeapon(id){
    let user = this.players[getUser(this.room, id)];
    if(!user.useweapon) return;
    if(user.weapon == "arrow"){
      this.arrows.push(new Arrow(this.room, id));
    } else {
      this.swords.push(new Sword(this.room, id));
    }
    this.players[getUser(this.room, id)].useweapon = false;
    this.players[getUser(this.room, id)].timeleft = weapon_interval;
  }
  updateWeapons(){
    
  }
}

module.exports = Room;