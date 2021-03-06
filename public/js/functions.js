function showMessage(message, time){
  if(prevent) return;
  let div = document.getElementById("message");
  div.style.opacity = "1";
  div.innerHTML = message;
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      if(prevent) return;
      div.style.opacity = "0";
      resolve();
    }, time * 1000);
  });
}

function showMessage2(message, time){
  let div = document.getElementById("message2");
  div.style.opacity = "1";
  div.innerHTML = message;
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      div.style.opacity = "0";
      resolve();
    }, time * 1000);
  });
}

function showMessage3(message){
  prevent = true;
  let div = document.getElementById("message");
  div.style.opacity = "1";
  div.innerHTML = message;
}

function changeView(data){
  var selfx, selfy;
  for(let i of data.players){
    if(i.id == socket.id){
      selfx = i.x;
      selfy = i.y;
    }
  }
  
  for(let i of data.lines){
    i.first[0] = i.first[0] - selfx + canvas.width / 2;
    i.first[1] = i.first[1] - selfy + canvas.height / 2;
    i.next[0] = i.next[0] - selfx + canvas.width / 2;
    i.next[1] = i.next[1] - selfy + canvas.height / 2;
  }
  
  for(let i of data.players){
    i.x = i.x - selfx + canvas.width / 2;
    i.y = i.y - selfy + canvas.height / 2;
  }
  for(let i of data.rocks){
    i.x = i.x - selfx + canvas.width / 2;
    i.y = i.y - selfy + canvas.height / 2;
  }
  for(let i of data.gold){
    i.x = i.x - selfx + canvas.width / 2;
    i.y = i.y - selfy + canvas.height / 2;
  }
  for(let i of data.swords){
    i.xbefore = i.xbefore - selfx + canvas.width / 2;
    i.ybefore = i.ybefore - selfy + canvas.height / 2;
    i.x = i.x - selfx + canvas.width / 2;
    i.y = i.y - selfy + canvas.height / 2;
  }
  for(let i of data.arrows){
    i.xbefore = i.xbefore - selfx + canvas.width / 2;
    i.ybefore = i.ybefore - selfy + canvas.height / 2
    i.x = i.x - selfx + canvas.width / 2;
    i.y = i.y - selfy + canvas.height / 2;
  }
  return data;
}

function sortPlayers(data){
  data.players.sort(function(a, b){return b.health - a.health});
}

function stop(){
  socket.emit("releasekey", "right", room);
  socket.emit("releasekey", "left", room);
  socket.emit("releasekey", "up", room);
  socket.emit("releasekey", "down", room);
}