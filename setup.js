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

var mouse = {
  down: false,
}

function fire (x, y, imgwidth, imgheight, vel, angle, time, img, collision, other) {
    collision = typeof collision  === "undefined" ? {} : collision;
    bullets.push({
      x: x - imgwidth / 2,
      y: y - imgheight / 2,
      width : imgwidth,
      height : imgheight,
      rotation : angle,
      velx: vel * Math.cos(angle * Math.PI / 180),
      vely: vel * Math.sin(angle * Math.PI / 180),
      time: time,
      team: player.team,
      img: img,
      update: function () {
        this.again();
        time--;
        if (time < 0) {
          this.deathrattle();
          return true;
        }
        // if (collision(player, bullets)) {
        //     if (player == ) friends();
        // }
        this.x += this.velx;
        this.y += this.vely;
        if (this.x >= 5760 - this.width) {
          this.walls("maxx");
        }
        if (this.x <= 0) {
          this.walls("minx");
        }
        if (this.y >= height-this.height) {
          this.walls("maxy");
        }
        if  (this.y <= 0) {
          this.walls("miny");
        }
        ctxgame.save();
        ctxgame.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctxgame.rotate(this.rotation * Math.PI /180);
        ctxgame.translate(-this.width / 2 - this.x, -this.height / 2 - this.y);
        ctxgame.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctxgame.restore();
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