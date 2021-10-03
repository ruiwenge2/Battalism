const { shootArrow, useSword } = require("../game/functions");

module.exports.checkSwordForHits = function(room, sword){
  return false;
}

module.exports.checkArrowForHits = function(room, arrow){
  let { players, rocks } = users[room];
  let dir = arrow.direction;
  if(arrow.x < 0 || arrow.x > rock_boundary || arrow.y < 0 || arrow.y > rock_boundary){
    return false;
  }

  for(let i of players){
    if(dir == "left"){
      if(arrow.x - arrow_speed - arrow_length < i.x + radius && arrow.x - arrow_speed - arrow_length > i.x - radius && arrow.y + arrow_length > i.y - radius && arrow.y - arrow_length < i.y + radius){
        shootArrow(i, arrow);
        return false;
      }
    } else if(dir == "right"){
      if(arrow.x + arrow_speed + arrow_length > i.x - radius && arrow.x + arrow_speed + arrow_length < i.x + radius && arrow.y + arrow_length > i.y - radius && arrow.y - arrow_length < i.y + radius){
        shootArrow(i, arrow);
        return false;
      }
    } else if(dir == "up"){
      if(arrow.x + arrow_length > i.x - radius && arrow.x - arrow_length < i.x + radius && arrow.y - arrow_speed - arrow_length < i.y + radius && arrow.y - arrow_speed - arrow_length > i.y - radius){
        shootArrow(i, arrow);
        return false;
      }
    } else if(dir == "down"){
      if(arrow.x + arrow_length > i.x - radius && arrow.x - arrow_length < i.x + radius && arrow.y + arrow_speed + arrow_length > i.y - radius && arrow.y + arrow_speed + arrow_length < i.y + radius){
        shootArrow(i, arrow);
        return false;
      }
    }
  }

  for(let j of rocks){
    let [ x, y, size ] = j;
    if(dir == "left"){
      if(arrow.x - arrow_speed - arrow_length < x + size && arrow.x - arrow_speed - arrow_length > x - size && arrow.y + arrow_length > y - size && arrow.y - arrow_length < y + size) return false;
    } else if(dir == "right"){
      if(arrow.x + arrow_speed + arrow_length > x - size && arrow.x + arrow_speed + arrow_length < x + size && arrow.y + arrow_length > y - size && arrow.y - arrow_length < y + size) return false;
    } else if(dir == "up"){
      if(arrow.x + arrow_length > x - size && arrow.x - arrow_length < x + size && arrow.y - arrow_speed - arrow_length < y + size && arrow.y - arrow_speed - arrow_length > y - size) return false;
    } else if(dir == "down"){
      if(arrow.x + arrow_length > x - size && arrow.x - arrow_length < x + size && arrow.y + arrow_speed + arrow_length > y - size && arrow.y + arrow_speed + arrow_length < y + size) return false;
    }
  }
  
  return true;
}