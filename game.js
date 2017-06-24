function update () {
  frames++;
  $("#banner").html("<h1>FRAMES: "+frames+"</h1>");
  ctxoverlay.clearRect(0,0,width,height);
  ctxgame.clearRect(0,0,width,height);
  player.update();
  b = this.bullets.length
  while (b--) {
    if (bullets[b].update()) {
      bullets.splice(b,1);
    }
  }
  window.requestAnimationFrame(update);
}

// wick.setup();
// jaxson.setup();
// mario.setup();
boba.setup();
// punisher.setup();

