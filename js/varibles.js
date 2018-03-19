// the client player
var player = {
  x: 1000,
  y: 1000,
  offset: 0,
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
  dead: false,
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
    if (this.health <= 0 && this.dead == false) {
      this.death();
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

    this.x += this.offset;

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

    this.y = ground.clip(this.x + this.width / 2) - this.height / 2;

    this.tilt = -ground.angle(this.x + this.width / 2);

    this.y -= this.height * Math.cos(this.tilt * Math.PI / 180) / 2;

    this.x -= this.height * Math.sin(-this.tilt * Math.PI / 180) / 2;

    this.offset = this.height * Math.sin(-this.tilt * Math.PI / 180) / 2;

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
  damage: function (radius, damage, x, y) {
    if (Math.sqrt((this.x + this.width/2 - x) ** 2 + (this.y + this.height/2 - y) ** 2) <= radius) {
      this.health -= damage;
    }
  },
  death: function () {
    explodsion(this.x + this.width/2, this.y + this.height/2, 1000, 40);
    this.dead = true;
  },
  angle: function () {

  },
  display: function () {

  },
}

// the client player
var player2 = {
  x: 4000,
  y: 1000,
  offset: 0,
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
  dead: false,
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
    if (this.health <= 0 && this.dead == false) {
      this.death();
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

    this.x += this.offset;

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

    this.y = ground.clip(this.x + this.width / 2) - this.height / 2;

    this.tilt = -ground.angle(this.x + this.width / 2);

    this.y -= this.height * Math.cos(this.tilt * Math.PI / 180) / 2;

    this.x -= this.height * Math.sin(-this.tilt * Math.PI / 180) / 2;

    this.offset = this.height * Math.sin(-this.tilt * Math.PI / 180) / 2;

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
    
    ctxgame.fillStyle = "purple";
    ctxgame.fillRect(this.x + this.width - 20, this.y + this.height - this.power * this.height / 60, 20, this.power * this.height / 60);

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
  damage: function (radius, damage, x, y) {
    if (Math.sqrt((this.x + this.width/2 - x) ** 2 + (this.y + this.height/2 - y) ** 2) <= radius) {
      this.health -= damage;
    }
  },
  death: function () {
    explodsion(this.x + this.width/2, this.y + this.height/2, 1000, 40);
    this.dead = true;
  },
  angle: function () {

  },
  display: function () {

  },
}

var ground = {
  number: 960,
  points: [1200],
  damage: function (radius, x, y) {
    for (i = Math.floor((x - radius) / this.distance); i < Math.floor((x + radius) / this.distance) + 1; i++) {
      if (Math.sqrt((i * this.distance - x) ** 2 + (this.points[i] - y) ** 2) <= radius  || (Math.abs(i * this.distance - x) <= radius && this.points[i] <= y)) {
        span = Math.sqrt(radius**2 - (x - i * this.distance)**2);
        change = (y + span) - this.points[i];
        this.points[i] += Math.max(Math.min(change, span*2), 0);
      }
    }
  },
  clip: function (x) {
    // a = this.points[Math.floor((x) / this.distance)];
    // b = ;
    a = x / this.distance;
    return (Math.floor(a) - a) * (this.points[Math.floor(a)] - this.points[Math.floor(a) + 1]) + this.points[Math.floor(a)];
  },
  angle: function (x) {
    return Math.atan2(this.points[Math.floor((x) / this.distance)] - this.points[Math.floor((x) / this.distance) + 1], this.distance) / Math.PI * 180;
  },
}

ground.distance = width / ground.number;
for (i = 0; i < ground.number; i++) {
  ground.points.push(1200);
}
  

var wall = [1, 1]