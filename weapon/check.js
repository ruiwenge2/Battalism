const { shootArrow, useSword } = require("../game/functions");

module.exports.checkSwordForHits = function(room, sword){
  let { players, rocks } = users[room];
  let dir = sword.direction;

  for(let i of players){
    if(dir == "left"){
      if(sword.x - sword_length < i.x + radius && sword.x - sword_length > i.x - radius && sword.y + sword_length > i.y - radius && sword.y - sword_length < i.y + radius){
        useSword(i, sword);
        return false;
      }
    } else if(dir == "right"){
      if(sword.x + sword_length > i.x - radius && sword.x + sword_length < i.x + radius && sword.y + sword_length > i.y - radius && sword.y - sword_length < i.y + radius){
        useSword(i, sword);
        return false;
      }
    } else if(dir == "up"){
      if(sword.x + sword_length > i.x - radius && sword.x - sword_length < i.x + radius && sword.y - sword_length < i.y + radius && sword.y - sword_length > i.y - radius){
        useSword(i, sword);
        return false;
      }
    } else if(dir == "down"){
      if(sword.x + sword_length > i.x - radius && sword.x - sword_length < i.x + radius && sword.y + sword_length > i.y - radius && sword.y + sword_length < i.y + radius){
        useSword(i, sword);
        return false;
      }
    }
  }

  for(let j of rocks){
    let { x, y, size } = j;
    if(dir == "left"){
      if(sword.x - sword_length < x + size && sword.x - sword_length > x - size && sword.y + sword_length > y - size && sword.y - sword_length < y + size) return false;
    } else if(dir == "right"){
      if(sword.x + sword_length > x - size && sword.x + sword_length < x + size && sword.y + sword_length > y - size && sword.y - sword_length < y + size) return false;
    } else if(dir == "up"){
      if(sword.x + sword_length > x - size && sword.x - sword_length < x + size && sword.y - sword_length < y + size && sword.y - sword_length > y - size) return false;
    } else if(dir == "down"){
      if(sword.x + sword_length > x - size && sword.x - sword_length < x + size && sword.y + sword_length > y - size && sword.y + sword_length < y + size) return false;
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
    if(i.x < arrow.x &&
      i.x + radius * 2 > arrow.x &&
      i.y < arrow.y &&
      radius * 2 + i.y > arrow.y){
      shootArrow(i, arrow);
      return false;
    }
  }

  for(let j of rocks){
    let { x, y, size } = j;
    if(x < arrow.x &&
      x + size * 2 > arrow.x &&
      y < arrow.y &&
      size * 2 + y > arrow.y){
      return false;
    }
  }
  
  return true;
}