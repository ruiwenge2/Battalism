const Filter = require("bad-words");
var filter = new Filter();

const Room = require("../room");
const { random, getUser, getRoomOfUser, checkUsername, userInRooms } = require("../game/functions");

const socketfunc = socket => {
  socket.on("check", (user, room, weapon) => {
    try {
      if(!(room in users)){
        users[room] = new Room(room);
        users[room].generateRocks();
        users[room].generateGold();
      }
      if(!user){
        socket.emit("error", "Please enter a username.");
        return socket.disconnect();
      }
      if(!(weapon in weapon_limits)){
        socket.emit("error", "Invalid weapon.");
        return socket.disconnect();
      }
      if(users[room].players.length >= max){
        socket.emit("error", "There are already 6 users in this room, so please join another.");
        return socket.disconnect();
      }
      for(let i of user){
        if(!allchars.includes(i)){
          socket.emit("error", "Username can only contain alphanumeric characters and underscores.");
          return socket.disconnect();
        }
      }
      if(user.length > max_user_length){
        socket.emit("error", "Your username cannot be longer than 15 characters.");
        return socket.disconnect();
      }
      socket.join(room);
      let id = socket.id;
      users[room].addPlayer(id, user, weapon);
      socket.emit("error", false);
      socket.broadcast.to(room).emit("joined", user);
      console.log(`${user} joined the room ${room}`)
      if(users[room].players.length >= 6){
        io.emit("removeroom", room);
      } else if(users[room].players.length == 1){
        io.emit("newroom", room);
      }
    } catch(e){
      socket.emit("leave");
    }
  });

  socket.on("move", (direction, room) => {
    if(!userInRooms(socket.id)) return socket.emit("leave");
    try {
      users[room].move(direction, socket.id);
    } catch(e){
      socket.emit("leave");
    }
  });

  socket.on("releasekey", (key, room) => {
    if(!userInRooms(socket.id)) return socket.emit("leave");
    try {
      users[room].release(key, socket.id);
    } catch(e){
      socket.emit("leave");
    }
  });

  socket.on("useweapon", angle => {
    if(!userInRooms(socket.id)) return socket.emit("leave");
    try {
      users[getRoomOfUser(socket.id)].useWeapon(socket.id, angle);
    } catch(e){
      socket.emit("leave");
    }
  });

  socket.on("switchweapon", () => {
    if(!userInRooms(socket.id)) return socket.emit("leave");
    try {
      let info = users[getRoomOfUser(socket.id)].players[getUser(getRoomOfUser(socket.id), socket.id)];
      let weapon = info.weapon == "arrow" ? "sword":"arrow";
      let weapon_text = info.weapon == "arrow" ? "a sword":"bow and arrows";
      users[getRoomOfUser(socket.id)].players[getUser(getRoomOfUser(socket.id), socket.id)].weapon = weapon;
      socket.emit("weaponswitch", weapon, weapon_text);
    } catch(e){
      socket.emit("leave");
    }
  });

  socket.on("lost", () => {
    if(!userInRooms(socket.id)) return socket.emit("leave");
    try {socket.disconnect();}
    catch(e){socket.emit("leave");}
  });

  socket.on("chat message", message => {
    if(!userInRooms(socket.id)) return socket.emit("leave");
    try {
      let id = socket.id;
      let room = getRoomOfUser(id);
      let user = users[room].players[getUser(room, id)].name;
      io.to(room).emit("chat message", user, filter.clean(message));
    } catch(e){
      socket.emit("leave");
    }
  });

  socket.on("disconnect", () => {
    try {
      if(!userInRooms(socket.id)) return socket.emit("leave");
      let room = getRoomOfUser(socket.id);
      users[room].removePlayer(socket.id);
      socket.emit("leave");
      if(users[room].players.length == 0){
        io.emit("removeroom", room);
      } else if(users[room].players.length == 5){
        io.emit("newroom", room);
      }
    } catch(e){
      socket.emit("leave");
    }
  });
}

module.exports = socketfunc;