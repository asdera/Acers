// the client player
var player = {
  character: boba,
  x: 0,
  y: 0,
  health: 1000,
  spell: 500,
  ult: 1000,
  team: null,
  colour: "red",
  radius: 160,
  rotation: 0,
  turn: 12,
  speed: 0.5,
  friction: 0.95,
  velx: 0,
  vely: 0,
  velspin: 0,
  effects: [],
  nextfire: 0,
  ability: 0,
  record: {
    shotsfired: 0,
    shotshit: 0,
    deaths: 0,
    kills: 0,
    killstreak: 0,
  },
  temp: {
  },
  update: function () {
    eff = this.effects.length
    while (eff--) {
      effect = this.effects[eff];
      effect.time--
      if (effect.time <= 0) {
        effect.effect();
        this.effects.splice(eff, 1);
      }
    }
    if (this.temp.init) {
      this.temp.init(this);
    }

    keyboard()

    this.velx *= this.friction;
    this.vely *= this.friction;
    this.velspin *= this.friction;

    this.x += this.velx;
    this.y += this.vely;
    this.rotation += this.velspin;

    if (this.ult < this.character.ult.max) {
      this.ult += this.character.ult.charge;
    }

    if (this.spell < this.character.spell.max) {
      this.spell += this.character.spell.charge;
    }

    if (this.nextfire > 0) {
      this.nextfire--;
    } else {
      this.nextfire = 0;
    }

    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x >= width - this.radius * 2) {
      this.x = width - this.radius * 2;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y >= height - this.radius * 2) {
      this.y = height - this.radius * 2;
    }

    if (mouse.down) {
      ctxgame.globalAlpha = 0.25;
      ctxgame.beginPath();
      ctxgame.moveTo(this.x + this.radius, this.y + this.radius);
      ctxgame.lineTo(mouse.x, mouse.y);
      ctxgame.lineWidth = 40;
    
      // set line color
      ctxgame.strokeStyle = "black";
      ctxgame.closePath();
      ctxgame.stroke();
      ctxgame.globalAlpha = 1;
    }

    if (this.ability == 1) {
      ctxgame.save();
      ctxgame.globalAlpha = 0.5;
      ctxgame.translate(this.x + this.radius, this.y + this.radius);
      ctxgame.rotate(-this.rotation / 180);
      ctxgame.translate(- this.radius - this.x, - this.radius - this.y);
      ctxgame.drawImage(this.character.spell.img, this.x - this.radius/2, this.y - this.radius/2, this.radius * 3, this.radius * 3);
      ctxgame.globalAlpha = 1;
      ctxgame.restore();
    } else if (this.ability == 2) {
      firepix = new Image();
      firepix.src = "Images/Fire/tmp-"+Math.floor(frames/2)%17+".gif";
      ctxgame.drawImage(firepix, this.x - this.radius * 2, this.y - this.radius * 4, this.radius * 6, this.radius * 6);
      ctxgame.drawImage(this.character.ult.img, this.x - this.radius/2, this.y - this.radius/2, this.radius * 3, this.radius * 3);
    } else {
      
    }
    ctxgame.beginPath();
    ctxgame.moveTo(this.x + this.radius, this.y + this.radius);
    ctxgame.arc(this.x + this.radius, this.y + this.radius, this.radius * 1.2, 0, Math.PI * 2);
    ctxgame.lineTo(this.x + this.radius, this.y + this.radius);
    ctxgame.fillStyle = "black";
    ctxgame.closePath();
    ctxgame.fill();

    ctxgame.beginPath();
    ctxgame.moveTo(this.x + this.radius, this.y + this.radius);
    ctxgame.arc(this.x + this.radius, this.y + this.radius, this.radius * 1.2, 0.5 * Math.PI, (this.spell / this.character.spell.max + 0.5) * Math.PI);
    ctxgame.lineTo(this.x + this.radius, this.y + this.radius);
    grd = ctxgame.createLinearGradient(0, this.y, 0, this.y + this.radius * 2);
    grd.addColorStop(0, "skyblue");
    grd.addColorStop(1, "blue");
    ctxgame.fillStyle = grd;
    ctxgame.closePath();
    ctxgame.fill();

    ctxgame.beginPath();
    ctxgame.moveTo(this.x + this.radius, this.y + this.radius);
    ctxgame.arc(this.x + this.radius, this.y + this.radius, this.radius * 1.2, (-this.ult / this.character.ult.max + 0.5) * Math.PI, 0.5 * Math.PI);
    ctxgame.lineTo(this.x + this.radius, this.y + this.radius);
    grd = ctxgame.createLinearGradient(0, this.y, 0, this.y + this.radius * 2);
    grd.addColorStop(0, "pink");
    grd.addColorStop(1, "orange");
    ctxgame.fillStyle = grd
    ctxgame.closePath();
    ctxgame.fill();

    ctxgame.beginPath();
    ctxgame.moveTo(this.x + this.radius, this.y + this.radius);
    ctxgame.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
    ctxgame.lineTo(this.x + this.radius, this.y + this.radius);
    ctxgame.fillStyle = "red";
    ctxgame.closePath();
    ctxgame.fill();

    ctxgame.save();
    ctxgame.globalAlpha = this.health * 0.8 / this.character.health + 0.2;
    ctxgame.translate(this.x + this.radius, this.y + this.radius);
    ctxgame.rotate(this.rotation * Math.PI /180);
    ctxgame.translate(- this.radius - this.x, - this.radius - this.y);
    ctxgame.drawImage(this.character.img, this.x, this.y, this.radius * 2, this.radius * 2);
    ctxgame.globalAlpha = 1;
    ctxgame.restore();

    if (this.temp.passive) {
      this.temp.passive(this);
    }
  },
  effect: function (effect, time, rrr) {
    this.effects.push({effect: effect, time: time, rrr: rrr});
  },
  shake: function () {
    x = range(-40, 40);
    y = range(-40, 40);
    this.x += x;
    this.y += y;
    this.effect(function() {
      player.x -= this.rrr.x;
      player.y -= this.rrr.y;
    }, 4, {x: x, y: y});
  },
  death: function () {
    
  },
  angle: function () {
    return Math.atan2(mouse.y - this.y - this.radius, mouse.x - this.x - this.radius) / Math.PI * 180;
  },
  display: function () {

  },
}

