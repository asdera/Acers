function keyboard () {
  if (keys[65] + keys[68] + keys[87] + keys[83] == 2) {
    x = Math.sqrt(2) / 2;
  } else {
    x = 1;
  }
  if (keys[65]) {
    // left
    player.velx -= player.speed * x;
    player.velspin -= player.speed / 3;
  }
  if (keys[68]) {
    // right
    player.velx += player.speed * x;
    player.velspin += player.speed / 3;
  }
  if (keys[87]) {
    // up
    player.vely -= player.speed * x;
    player.velspin -= player.speed / 7;
  }
  if (keys[83]) {
    // down
    player.vely += player.speed * x;
    player.velspin += player.speed / 7;
  }
  if (keys[32] && player.character.ult.cost <= player.ult) {
    // ult
    player.ability = 2;
    player.velspin += player.speed;
  } else if (keys[16] && player.character.spell.cost <= player.spell) {
    // spell
    player.ability = 1;
    player.velspin -= player.speed;
  } else if (!keys[32] && !keys[16] && player.character.attack.cost <= player.spell) {
    player.ability = 0;
  } else {
    player.ability = -1;
  }
}

$("#cloud").mousedown(function() {
  if (event.which == 1) {
    mouse.down = true;
  }
}).mouseup(function() {
  if (mouse.down && event.which == 1 && player.nextfire <= 0) {
    if (player.ability == 0) {
      player.character.attack.cast(player);
      player.spell -= player.character.attack.cost;
    } else if (player.ability == 1) {
      player.character.spell.cast(player);
      player.spell -= player.character.spell.cost;
    } else if (player.ability == 2) {
      player.character.ult.cast(player);
      player.ult -= player.character.ult.cost;
    } else {
      console.log("OUT OF AMMO BUD!");
    }
    player.nextfire = player.character.firerate;
  }
  mouse.down = false;
}).mousemove(function() {
  mouse.x = (event.clientX - $("#cloud").offset().left) * 4;
  mouse.y = (event.clientY - $("#cloud").offset().top) * 4;
}).contextmenu(function() {
  return false;
});