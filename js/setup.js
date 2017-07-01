(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
// ~~~
// thanks to http://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript

function range(min, max) {
    return Math.random() * (max - min) + min;
}

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
  start();
  update();
});

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40, 9].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// setting up canvases
var cloudcanvas = $("#cloud")[0];
var ctxcloud = cloudcanvas.getContext("2d");
var overlaycanvas = $("#overlay")[0];
var ctxoverlay = overlaycanvas.getContext("2d");
var gamecanvas = $("#game")[0];
var ctxgame = gamecanvas.getContext("2d");
var backgroundcanvas = $("#background")[0];
var ctxbackground = backgroundcanvas.getContext("2d");
var width = 5760;
var height = 2880;
var map = "pie";
var frames = 0;
var keys = [];
var bullets = [];
var players = [];
cloud.width = width;
cloud.height = height;
overlay.width = width;
overlay.height = height;
game.width = width;
game.height = height;
background.width = width;
background.height = height;

function fire(damage, radius, x, y, imgwidth, imgheight, vel, angle, time, img, collision, other) {
  collision = typeof collision  === "undefined" ? {} : collision;
  bullets.push({
    x: x - imgwidth / 2,
    y: y - imgheight / 2,
    width : imgwidth,
    height : imgheight,
    damage : damage,
    radius : radius,
    rotation : angle,
    velx: vel * Math.cos(angle * Math.PI / 180),
    vely: vel * Math.sin(angle * Math.PI / 180),
    time: time,
    team: player.team,
    img: img,
    update: function () {
      this.again();
      this.rotation = Math.atan2(this.vely, this.velx) / Math.PI * 180;
      this.time--;
      this.damage++;
      if (this.time < 0) {
        this.hit();
        return true;
      }
      // if (collision(player, bullets)) {
      //     if (player == ) friends();
      // }
      this.vely++;
      this.x += this.velx;
      this.y += this.vely;
      if (this.x <= 0) {
        this.x = 0;
        this.velx = -this.velx;
        wall[0] = 1;
      }
      if (this.x >= 5760 - this.width) {
        this.x = width - this.width;
        this.velx = -this.velx;
        wall[1] = 1;
      }
      if (this.y >= 2000) {
        this.hit();
        return true;
      }
      if (this.y < 0 - this.height) {
        ctxgame.beginPath();
        ctxgame.moveTo(this.x + this.width/2, 0);
        ctxgame.lineTo(this.x + this.width/2 - 30, 30);
        ctxgame.lineTo(this.x + this.width/2 + 30, 30);
        ctxgame.lineTo(this.x + this.width/2, 0);
        ctxgame.fillStyle = "cyan";
        ctxgame.closePath();
        ctxgame.fill();
      } else {
        ctxgame.save();
        ctxgame.translate(this.x + this.width/2, this.y + this.height/2);
        ctxgame.rotate(this.rotation * Math.PI /180);
        ctxgame.translate(-this.width/2 - this.x, -this.height/2 - this.y);
        ctxgame.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctxgame.restore();
      }
    },
    hit: function () {
      player.damage(this.radius, this.damage, this.x + this.width/2, this.y + this.height/2);
      player2.damage(this.radius, this.damage, this.x + this.width/2, this.y + this.height/2);
      explodsion(this.x + this.width/2, this.y + this.height/2, 50, 8);
    },
    enemies: typeof collision.enemies  === "undefined" ? function () {} : collision.enemies,
    friends: typeof collision.friends  === "undefined" ? function () {} : collision.friends,
    bullets: typeof collision.bullets  === "undefined" ? function () {} : collision.bullets,
    walls: typeof collision.walls  === "undefined" ? function () {time = 0;} : collision.walls,
    deathrattle: typeof collision.deathrattle  === "undefined" ? function () {} : collision.deathrattle,
    again: typeof collision.again  === "undefined" ? function () {} : collision.again,
    other: typeof other  === "undefined" ? {} : other,
  });
}

function explodsion(x, y, radius, frames) {
  bullets.push({
    x: x,
    y: y,
    radius: radius,
    frame: 0,
    time: frames,
    update: function () {
      this.frame++;
      this.time--;
      this.radius += 10;
      if (this.time < 0) {
        return true;
      }
      ctxgame.save();
      ctxgame.beginPath();
      ctxgame.moveTo(this.x, this.y);
      ctxgame.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctxgame.lineTo(this.x, this.y);
      ctxgame.closePath();
      ctxgame.stroke();
      ctxgame.clip();
      ctxgame.drawImage(neonred, 0, 0, width, height);
      ctxgame.restore();
    }
  });
}