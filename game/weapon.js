const { getUser, shootArrow, useSword } = require("./functions");

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

function checkSwordForHits(room, sword){
  return false;
}

function checkArrowForHits(room, arrow){
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