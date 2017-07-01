// the client player
var player = {
  x: 1000,
  y: 1900,
  width: 300,
  height: 200,
  weapon: ["s", "shell"],
  health: 1000,
  power: 0,
  team: null,
  img: tank,
  radius: 160,
  rotation: 0,
  tilt: 0,
  speed: 1,
  sensitivity: 0.5,
  friction: 0.8,
  velx: 0,
  velspin: 0,
  effects: [],
  nextfire: 0,
  firerate: 40,
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
    if (this.health <= 0) {
      this.tilt = 180;
      this.rotation = 180;
      this.y = 2050;
    }
    eff = this.effects.length
    while (eff--) {
      effect = this.effects[eff];
      effect.time--;
      if (effect.time <= 0) {
        effect.effect();
        this.effects.splice(eff, 1);
      }
    }
    if (this.temp.init) {
      this.temp.init(this);
    }

    keyboard();

    this.velx *= this.friction;
    this.velspin *= this.friction;

    this.x += this.velx;
    this.rotation += this.velspin;

    if (this.nextfire > 0) {
      this.nextfire--;
    } else {
      this.nextfire = 0;
    }

    if (this.x <= 0) {
      this.x = 0;
      wall[0] = 1;
    }
    if (this.x >= width - this.width) {
      this.x = width - this.width;
      wall[1] = 1;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y >= height - this.height) {
      this.y = height - this.height;
    }
    
    ctxgame.fillStyle = "lime";
    ctxgame.fillRect(this.x, this.y + this.height - this.power * this.height / 60, 20, this.power * this.height / 60);

    ctxgame.save();
    ctxgame.translate(this.x + this.width/2, this.y + this.height/2);
    ctxgame.rotate(this.rotation * Math.PI /180);
    ctxgame.translate(- this.width/2 - this.x, - this.height/2 - this.y);
    ctxgame.drawImage(gun, this.x + this.width*2/5, this.y - this.height/2, this.width/5, this.height);
    ctxgame.restore();

    ctxgame.save();
    ctxgame.translate(this.x + this.width/2, this.y + this.height/2);
    ctxgame.rotate(this.tilt * Math.PI /180);
    ctxgame.translate(- this.width/2 - this.x, - this.height/2 - this.y);
    ctxgame.drawImage(tank, this.x, this.y, this.width, this.height);
    ctxgame.restore();
  },
  effect: function (effect, time, rrr) {
    this.effects.push({effect: effect, time: time, rrr: rrr});
  },
  damage: function (raduis, damage, x, y) {
    if (Math.sqrt((this.x + this.width/2 - x) ** 2 + (this.y + this.height/2 - y) ** 2) <= raduis) {
      this.health -= damage;
    }
  },
  death: function () {
    
  },
  angle: function () {

  },
  display: function () {

  },
}

// the client player
var player2 = {
  x: 4000,
  y: 1900,
  width: 300,
  height: 200,
  weapon: ["s", "shell"],
  health: 1000,
  power: 0,
  team: null,
  img: tank,
  radius: 160,
  rotation: 0,
  tilt: 0,
  speed: 1,
  sensitivity: 0.5,
  friction: 0.8,
  velx: 0,
  velspin: 0,
  effects: [],
  nextfire: 0,
  firerate: 40,
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
    if (this.health <= 0) {
      this.tilt = 180;
      this.rotation = 180;
      this.y = 2050;
    }
    eff = this.effects.length
    while (eff--) {
      effect = this.effects[eff];
      effect.time--;
      if (effect.time <= 0) {
        effect.effect();
        this.effects.splice(eff, 1);
      }
    }
    if (this.temp.init) {
      this.temp.init(this);
    }

    keyboard2();

    this.velx *= this.friction;
    this.velspin *= this.friction;

    this.x += this.velx;
    this.rotation += this.velspin;

    if (this.nextfire > 0) {
      this.nextfire--;
    } else {
      this.nextfire = 0;
    }

    if (this.x <= 0) {
      this.x = 0;
      wall[0] = 1;
    }
    if (this.x >= width - this.width) {
      this.x = width - this.width;
      wall[1] = 1;
    }
    console.log(wall)
    console.log(this.x)
    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y >= height - this.height) {
      this.y = height - this.height;
    }
    
    ctxgame.fillStyle = "purple";
    ctxgame.fillRect(this.x + this.width - 10, this.y + this.height - this.power * this.height / 60, 20, this.power * this.height / 60);

    ctxgame.save();
    ctxgame.translate(this.x + this.width/2, this.y + this.height/2);
    ctxgame.rotate(this.rotation * Math.PI /180);
    ctxgame.translate(- this.width/2 - this.x, - this.height/2 - this.y);
    ctxgame.drawImage(gun2, this.x + this.width*2/5, this.y - this.height/2, this.width/5, this.height);
    ctxgame.restore();

    ctxgame.save();
    ctxgame.translate(this.x + this.width/2, this.y + this.height/2);
    ctxgame.rotate(this.tilt * Math.PI /180);
    ctxgame.translate(- this.width/2 - this.x, - this.height/2 - this.y);
    ctxgame.drawImage(tank2, this.x, this.y, this.width, this.height);
    ctxgame.restore();
  },
  effect: function (effect, time, rrr) {
    this.effects.push({effect: effect, time: time, rrr: rrr});
  },
  damage: function (raduis, damage, x, y) {
    if (Math.sqrt((this.x + this.width/2 - x) ** 2 + (this.y + this.height/2 - y) ** 2) <= raduis) {
      this.health -= damage;
    }
  },
  death: function () {
    
  },
  angle: function () {

  },
  display: function () {

  },
}

ground = [2100, 2100];

wall = [1, 1]