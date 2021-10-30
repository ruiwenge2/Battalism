const { shootArrow, useSword } = require("../game/functions");

module.exports.checkSwordForHits = function(room, sword){
  let { players, rocks } = users[room];
  let dir = sword.direction;
  for(let i of players){
    if(i.id == sword.userid) continue;
    if(i.x - radius < sword.x &&
      i.x + radius > sword.x &&
      i.y - radius < sword.y &&
      i.y + radius > sword.y){
      useSword(i, sword);
      return false;
    }
  }
  return true;
}

module.exports.checkArrowForHits = function(room, arrow){
  let { players, rocks } = users[room];
  let dir = arrow.direction;
  if(arrow.x < 0 || arrow.x > game_width || arrow.y < 0 || arrow.y > game_height){
    return false;
  }

  for(let i of players){
    if(i.id == arrow.userid) continue;
    if(i.x - radius < arrow.x &&
      i.x + radius > arrow.x &&
      i.y - radius < arrow.y &&
      i.y + radius > arrow.y){
      shootArrow(i, arrow);
      return false;
    }
  }

  for(let j of rocks){
    let { x, y, size } = j;
    if(x - size < arrow.x &&
      x + size > arrow.x &&
      y - size < arrow.y &&
      y + size > arrow.y){
      return false;
    }
  }
  
  return true;
}