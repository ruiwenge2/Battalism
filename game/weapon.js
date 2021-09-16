class Sword {
  constructor(room, user){
    this.user = user;

  }
}

class Arrow {
  constructor(room, user, x, y){
    this.user = user;
    this.x = x;
    this.y = y;
  }
}

module.exports = {
  Sword:Sword,
  Arrow:Arrow
}

module.exports.updateWeapons = function(room){
  
}

function checkSwordForHits(room, sword){

}

function checkArrowForHits(room, arrow){

}