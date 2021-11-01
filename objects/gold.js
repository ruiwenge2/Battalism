const { random } = require("../game/functions");

class Gold {
  constructor(){
    this.value = random(1, 5);
    this.size = 10 + this.value * 3;
    this.x = random(this.size, game_width - this.size);
    this.y = random(this.size, game_height - this.size);
  }
}

module.exports = Gold;