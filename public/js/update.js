function update(data){
  c.clearRect(0, 0, canvas.width, canvas.height);
  usersdiv.innerHTML = "";
  document.querySelector("#players h1").innerHTML = "Players";
  let { players, rocks, swords, arrows } = data;
  console.log(arrows)
  for(let info of rocks){
    let [x, y, size] = info;
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI);
    c.fillStyle = "gray";
    c.fill();
  }
  for(let info of players){
    c.beginPath();
    c.arc(info.x, info.y, radius, 0, 2 * Math.PI);
    c.fillStyle = "black";
    c.fill();
    c.stroke();
    c.fillStyle = "white";
    c.font = "14px Arial";
    c.fillText(info.name, info.x - info.name.length * 3, info.y);
    usersdiv.innerText += `${info.name}, ${info.health} health`;
    usersdiv.innerHTML += "<br>";
  }
  for(let arrow of arrows){
    c.beginPath();
    c.moveTo(arrow.x, arrow.y);
    let direction = arrow.direction;
    if(direction == "left"){
      c.lineTo(arrow.x - arrow_length, arrow.y);
    } else if(direction == "right"){
      c.lineTo(arrow.x + arrow_length, arrow.y);
    } else if(direction == "up"){
      c.lineTo(arrow.x, arrow.y - arrow_length);
    } else if(direction == "down"){
      c.lineTo(arrow.x, arrow.y + arrow_length);
    }
    c.stroke();
  }
  for(let rock of rocks){
    c.beginPath();
    c.moveTo(rock.x, rock.y);
    let direction = rock.direction;
    if(direction == "left"){
      c.lineTo(rock.x - arrow_length, rock.y);
    } else if(direction == "right"){
      c.lineTo(rock.x + arrow_length, rock.y);
    } else if(direction == "up"){
      c.lineTo(rock.x, rock.y - arrow_length);
    } else if(direction == "down"){
      c.lineTo(rock.x, rock.y + arrow_length);
    }
    c.stroke();
  }
}