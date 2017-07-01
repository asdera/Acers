function start () {
  ctxbackground.drawImage(neon, 0, 0, width, height);
}

function update () {
  frames++;
  $("#banner").html("<h1>FRAMES: "+frames+"</h1>");

  if (frames % 100 == 0) {
    $("#background").fadeTo(1000, Math.random() / 3);
  }

  ctxoverlay.clearRect(0,0,width,height);
  ctxgame.clearRect(0,0,width,height);
  
  wall[0] *= 0.9;
  wall[1] *= 0.9;
  ctxgame.save();
  ctxgame.fillStyle = "blue";
  ctxgame.globalAlpha = wall[0] + 0.2;
  ctxgame.fillRect(0, 0, 60, height);
  ctxgame.globalAlpha = wall[1] + 0.2;
  ctxgame.fillRect(width - 60, 0, width, height);
  ctxgame.restore();

  ctxgame.save();
  ctxgame.globalAlpha = 0.4;
  ctxgame.beginPath();
  ctxgame.moveTo(0, height);
  for (i in ground) {
    ctxgame.lineTo(i * width, ground[i]);
  }
  ctxgame.lineTo(width, height);
  ctxgame.lineTo(0, height);
  ctxgame.fillStyle = "cyan";
  ctxgame.closePath();
  ctxgame.fill();
  ctxgame.restore();
  b = this.bullets.length
  while (b--) {
    if (bullets[b].update()) {
      bullets.splice(b,1);
    }
  }
  player.update();
  player2.update(); 
  
  if (player.health > 0) {
    ctxgame.fillStyle = "red";
    ctxgame.fillRect(0, height - 100, player.health, 50);
  } else {
    ctxgame.fillStyle = "yellow";
    ctxgame.fillRect(0, height - 100, -player.health, 50);
  }
  
  if (player2.health > 0) {
    ctxgame.fillStyle = "red";
    ctxgame.fillRect(width - player2.health, height - 100, player2.health, 50);
  } else {
    ctxgame.fillStyle = "yellow";
    ctxgame.fillRect(width + player2.health, height - 100, -player2.health, 50);
  }

  // beat = new Image();
  // beat.src = "Images/Background/BeatGif/BeatGif" + ('000' + frames%120).substr(-3) + ".gif";
  // ctxbackground.drawImage(beat, 0, 0, width, height);
  window.requestAnimationFrame(update);
}



