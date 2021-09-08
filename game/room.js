class Room {
  constructor(){
    this.players = [];

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
}
module.exports = Room;