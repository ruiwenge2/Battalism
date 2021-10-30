const { random, getUser, randomDirection } = require("../game/functions");
const { checkLeft, checkRight, checkTop, checkBottom } = require("./move");
const { Sword, Arrow } = require("../weapon");
const Rock = require("../objects/rock");
const Gold = require("../objects/gold");

class Room {
  constructor(room){
    this.players = [];
    this.room = room;
    this.rocks = [];
    this.swords = [];
    this.arrows = [];
    this.lines = [];
    for(let i = 0; i <= game_width; i += game_width / 10){
      this.lines.push({
        first:[i, 0],
        next:[i, game_height]
      });
    }
    for(let i = 0; i <= game_height; i += game_height / 10){
      this.lines.push({
        first:[0, i],
        next:[game_height, i]
      });
    }
    console.log(this.lines)
  }
  addPlayer(id, user, weapon){
    this.players.push({
      id:id,
      name:user,
      x:random(radius, game_width - radius),
      y:random(radius, game_height - radius),
      weapon:weapon,
      health:100,
      side:randomDirection(),
      left:false,
      right:false,
      up:false,
      down:false,
      times:weapon_limits[weapon],
      useweapon:true,
      timeleft:0
    });
  }
  removePlayer(id){
    let num = getUser(this.room, id);
    console.log(`${this.players[num].name} left the room ${this.room}`);
    this.players.splice(num, 1);
  }
  generateRocks(){
    for(let i = 0; i < random(60, 100); i++){
      this.rocks.push(new Rock());
    }
  }
  move(direction, id){
    this.players[getUser(this.room, id)].direction = direction;
    this.players[getUser(this.room, id)].side = direction;
    if(direction == "right"){
      this.players[getUser(this.room, id)].right = true;
      this.players[getUser(this.room, id)].left = false;
    }
    if(direction == "left"){
      this.players[getUser(this.room, id)].left = true;
      this.players[getUser(this.room, id)].right = false;
    }
    if(direction == "up"){
      this.players[getUser(this.room, id)].up = true;
      this.players[getUser(this.room, id)].down = false;
    }
    if(direction == "down"){
      this.players[getUser(this.room, id)].down = true;
      this.players[getUser(this.room, id)].up = false;
    }
  }
  release(id){
    this.players[getUser(this.room, id)].direction = "none";
    this.players[getUser(this.room, id)].right = false;
    this.players[getUser(this.room, id)].left = false;  this.players[getUser(this.room, id)].up = false;
    this.players[getUser(this.room, id)].down = false;
  }
  updatePositions(){
    for(let user of this.players){
      if(user.right){
        if(checkRight(this.room, user.id)) this.players[getUser(this.room, user.id)].x += speed;
      }
      if(user.left){
        if(checkLeft(this.room, user.id)) this.players[getUser(this.room, user.id)].x -= speed;
      }
      if(user.up){
        if(checkTop(this.room, user.id)) this.players[getUser(this.room, user.id)].y -= speed;
      }
      if(user.down){
        if(checkBottom(this.room, user.id)) this.players[getUser(this.room, user.id)].y += speed;
      }
    }
    
    for(let i = 0; i < this.players.length; i++){
      if(this.players[i].timeleft > 0){
        this.players[i].timeleft -= 2;
      } else if(this.players[i].timeleft <= 0){
        this.players[i].useweapon = true;
      }
    }
  }
  useWeapon(id, angle){
    let num = getUser(this.room, id);
    let user = this.players[num];
    if(!user.useweapon) return;
    if(user.times <= 0){
      if(user.weapon == "arrow"){
        io.to(id).emit("noweapon", "You don't have any arrows left.");
      } else {
        io.to(id).emit("noweapon", "You can't use your sword anymore.");
      }
      return;
    }
    if(user.weapon == "arrow"){
      this.arrows.push(new Arrow(this.room, id, angle));
    } else {
      this.swords.push(new Sword(this.room, id, angle));
    }
    this.players[num].useweapon = false;
    this.players[num].timeleft = weapon_interval;
    this.players[num].times -= 1;
    io.to(id).emit("timesleft", this.players[num].times, user.weapon);
  }
  updateWeapons(){
    for(let i = 0; i < this.arrows.length; i++){
      if(this.arrows[i].out){
        this.arrows.splice(i, 1);
      } else {
        this.arrows[i].update();
      }
    }
    for(let i = 0; i < this.swords.length; i++){
      if(this.swords[i].time >= 25){
        this.swords.splice(i, 1);
      } else {
        this.swords[i].update();
      }
    }
  }
}

module.exports = Room;