function keyboard () {
  if (keys[87]) {
    // up
    player.velx += player.speed;
  }
  if (keys[83]) {
    // down
    player.velx -= player.speed;
  }
  if (keys[65]) {
    // left
    player.velspin -= player.sensitivity;
  }
  if (keys[68]) {
    // right
    player.velspin += player.sensitivity;
  }
  if (keys[32]) {
    if (player.power >= 50) {
      player.power = 50;
    } else {
      player.power++;
    }
  } else {
    if (player.nextfire <= 0 && player.power != 0) {
      a = player.rotation - 90;
      fire(150, 250, player.x + player.width/2, player.y + player.height/2, 150, 150, 25 + player.power, a, 400, pekker);
      player.nextfire = player.firerate;
    }
    player.power = 0;
  }
}

function keyboard2 () {
  if (keys[38]) {
    // up
    player2.velx += player2.speed; 
  }
  if (keys[40]) {
    // down
    player2.velx -= player2.speed;
  }
  if (keys[37]) {
    // left
    player2.velspin -= player2.sensitivity;
  }
  if (keys[39]) {
    // right
    player2.velspin += player2.sensitivity;
  }
  if (keys[13]) {
    if (player2.power > 50) {
      player2.power = 50;
    } else {
      player2.power++;
    }
  } else {
    if (player2.nextfire <= 0 && player2.power != 0) {
      a = player2.rotation - 90;
      fire(150, 250, player2.x + player2.width/2, player2.y + player2.height/2, 150, 150, 25 + player2.power, a, 400, pekker);
      player2.nextfire = player2.firerate;
    }
    player2.power = 0;
  }
}


