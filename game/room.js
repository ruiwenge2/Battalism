const { random, getUser } = require("../functions");

class Room {
  constructor(room){
    this.players = [];
    this.room = room;
  }
  addPlayer(id, user){
    this.players.push({
      id:id,
      name:user,
      x:0,
      y:200,
      weapon:null,
      health:100
    });
  }
  removePlayer(id){
    this.players.splice(getUser(this.room, id), 1);
  }
}
module.exports = Room;