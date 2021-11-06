const { checkSwordForHits, checkArrowForHits } = require("./check");
const { getUser } = require("../game/functions");

class Sword {
  constructor(room, id, angle){
    this.room = room;
    let user = users[this.room].players[getUser(room, id)];
    this.userid = id;
    this.out = false;
    this.direction = user.side;
    this.user = user.name;
    this.time = 0;
    this.hit = false;
    this.angle = angle;
    this.xchange = Math.cos(angle) * sword_length;
    this.ychange = Math.sin(angle) * sword_length;
    this.xbefore = user.x + Math.cos(angle) * radius;
    this.ybefore = user.y + Math.sin(angle) * radius;
    this.x = this.xbefore + this.xchange;
    this.y = this.ybefore + this.ychange;
    this.midx = this.xbefore + this.xchange / 2;
    this.midy = this.ybefore + this.ychange / 2;
  }
  update(){
    let user = users[this.room].players[getUser(room, this.userid)];
    this.xbefore = user.x + Math.cos(this.angle) * radius;
    this.ybefore = user.y + Math.sin(this.angle) * radius;
    this.x = this.xbefore + this.xchange;
    this.y = this.ybefore + this.ychange;
    this.time++;
    if(this.hit) return;
    if(!checkSwordForHits(this.room, this)){
      this.hit = true;
    }
  }
}

class Arrow {
  constructor(room, id, angle){
    this.room = room;
    let user = users[this.room].players[getUser(room, id)];
    this.userid = user.id;
    this.out = false;
    this.direction = user.side;
    this.user = user.name;
    this.xspeed = Math.cos(angle) * arrow_speed;
    this.yspeed = Math.sin(angle) * arrow_speed;
    this.xbefore = user.x + Math.cos(angle) * radius;
    this.ybefore = user.y + Math.sin(angle) * radius;
    this.x = this.xbefore + this.xspeed;
    this.y = this.ybefore + this.yspeed;
  }
  update(){
    if(!checkArrowForHits(this.room, this)){
      this.out = true;
    }
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.xbefore = this.x - this.xspeed;
    this.ybefore = this.y - this.yspeed;
  }
}

module.exports = {
  Sword:Sword,
  Arrow:Arrow
}
