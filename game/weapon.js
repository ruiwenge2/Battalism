const { getUser } = require("./functions");

class Sword {
  constructor(room, id){
    this.room = room;
    this.user = users[this.room].players[getUser(room, id)];
    this.direction = this.user.side;
    this.x = this.user.x;
    this.y = this.user.y;
    this.time = 0;
  }
  update(){
    this.time++;
    if(checkSwordForHits(this.room, this)){
      
    }
  }
}

class Arrow {
  constructor(room, id){
    this.room = room;
    let user = users[this.room].players[getUser(room, id)];
    this.out = false;
    this.direction = user.side;
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

function checkSwordForHits(room, sword){

}

function checkArrowForHits(room, arrow){
  let { players, rocks } = users[room];
  if(arrow.x < 0 && arrow.x > rock_boundary && arrow.y < 0 && arrow.y > rock_boundary){
    console.log("removed")
    return false;
  }
  return true
}