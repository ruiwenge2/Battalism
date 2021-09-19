const { getUser } = require("./functions");

class Sword {
  constructor(room, id){
    this.room = room;
    this.user = users[this.room].players[getUser(room, id)];
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
    this.user = users[this.room].players[getUser(room, id)];
    this.direction = this.user.side;
    this.x = this.user.x;
    this.y = this.user.y;
  }
  update(){
    switch(this.direction){
      
    }
    if(checkArrowForHits(this.room, this)){

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

}