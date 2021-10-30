const { random } = require("../game/functions");

class Rock {
  constructor(){
    this.size = random(min_rock_size / 2, max_rock_size / 2);
    this.x = random(this.size, game_width - this.size);
    this.y = random(this.size, game_height - this.size);
  }
}

module.exports = Rock;