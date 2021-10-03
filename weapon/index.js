const { checkSwordForHits, checkArrowForHits } = require("./check");
const { getUser } = require("../game/functions");

class Sword {
  constructor(room, id){
    this.room = room;
    let user = users[this.room].players[getUser(room, id)];
    this.out = false;
    this.direction = user.side;
    this.user = user.name;
    this.time = 0;
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
    this.time++;
    if(checkSwordForHits(this.room, this)){
      this.hit = true;
    }
  }
}

class Arrow {
  constructor(room, id){
    this.room = room;
    let user = users[this.room].players[getUser(room, id)];
    this.out = false;
    this.direction = user.side;
    this.user = user.name;
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
    if(!checkArrowForHits(this.room, this)){
      this.out = true;
    }
    if(this.direction == "left"){
      this.x -= arrow_speed;
    } else if(this.direction == "right"){
      this.x += arrow_speed;
    } else if(this.direction == "up"){
      this.y -= arrow_speed;
    } else if(this.direction == "down"){
      this.y += arrow_speed;
    }
  }
}

module.exports = {
  Sword:Sword,
  Arrow:Arrow
}
