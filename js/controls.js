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
      weapon[player.weapon[0]][player.weapon[1]].shoot(player);
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
      weapon[player2.weapon[0]][player2.weapon[1]].shoot(player2);
      player2.nextfire = player2.firerate;
    }
    player2.power = 0;
  }
}


