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
    if(this.direction == "left"){
      this.x = user.x - radius;
      this.y = user.y;
    } else if(this.direction == "right"){
      this.x = user.x + radius;
      this.y = user.y;
    } else if(this.direction == "up"){
      this.x = user.x;
      this.y = user.y - radius;
    } else if(this.direction == "down"){
      this.x = user.x;
      this.y = user.y + radius;
    }
  }
  update(){
    let user = users[this.room].players[getUser(room, this.userid)];
    if(this.direction == "left"){
      this.x = user.x - radius;
      this.y = user.y;
    } else if(this.direction == "right"){
      this.x = user.x + radius;
      this.y = user.y;
    } else if(this.direction == "up"){
      this.x = user.x;
      this.y = user.y - radius;
    } else if(this.direction == "down"){
      this.x = user.x;
      this.y = user.y + radius;
    }
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
    this.x = user.x + this.xspeed;
    this.y = user.y + this.yspeed;
    this.xbefore = user.x;
    this.ybefore = user.y;
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
