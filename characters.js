var wick = {
	img : new Image(),
	health: 1000,
	firerate: 20,
	speed: 0.5,
	attack:  {
		name: "Wrist Heckler",
		img: new Image(),
		cost: 300,
		// made player thignerr
		cast: function (player) {
			a = player.angle();
			fire(player.x + player.radius, player.y + player.radius, 250, 250, 40, a, 100, wick.bullet.strong);
			player.effect(function() {
				fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + range(0, 20), 100, wick.bullet.weak);
				fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + range(-20, 0), 100, wick.bullet.weak);
			}, 10);
		}
	},
	spell:  {
		name: "Tactical Roll",
		img: new Image(),
		cost: 400,
		max: 1000,
		charge: 4,
		cast: function (player) {
			a = player.angle();
			player.speed -= 0.5;
			player.friction = 1 - (1 - player.friction) / 4;
			player.velx = 30 * Math.cos(a * Math.PI / 180);
      		player.vely = 30 * Math.sin(a * Math.PI / 180);
      		player.velspin = 20 * (Math.round(Math.random()) * 2 - 1);
      		player.effect(function() {
				player.friction = 1 - (1 - player.friction) * 4;
				player.speed += 0.5;
				fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + 45, 100, wick.bullet.weak);
				fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + 135, 100, wick.bullet.weak);
				fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + 225, 100, wick.bullet.weak);
				fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + 315, 100, wick.bullet.weak);
			}, 10);
		}
	},
	ult: {
		name: "Avenge",
		img: new Image(),
		cost: 1000,
		max: 1000,
		charge: 1,
		cast: function (player) {
			a = player.angle();
			for (i = 0; i < 10; i++) {
				player.effect(function() {
					fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a + 20 - this.rrr * 5, 100, wick.bullet.weak);
					fire(player.x + player.radius, player.y + player.radius, 200, 200, 30, a - 20 + this.rrr * 5, 100, wick.bullet.weak);
				}, i * 5, i);
    		}
    		player.effect(function() {
    			fire(player.x + player.radius, player.y + player.radius, 250, 250, 40, a, 100, wick.bullet.strong);
    			fire(player.x + player.radius, player.y + player.radius, 250, 250, 40, a + 20, 100, wick.bullet.strong);
    			fire(player.x + player.radius, player.y + player.radius, 250, 250, 40, a - 20, 100, wick.bullet.strong);
			}, 50);
		}
	},
	bullet: {
		strong: new Image(),
		weak: new Image(),
	},
	setup: function() {
		this.img.src = "Images/Wick/Hp.png"
		this.ult.img.src = "Images/Wick/Ult.png"
		this.spell.img.src = "Images/Wick/Spell.png"
		this.bullet.strong.src = "Images/Wick/Bullet.png"
		this.bullet.weak.src = "Images/Wick/Pekker.png"
	}
}
var jaxson = {
	img : new Image(),
	health: 1000,
	firerate: 50,
	speed: 0.5,
	attack:  {
		name: "Slapshot",
		img: new Image(),
		cost: 350,
		cast: function (player) {
			a = player.angle();
			for (i = 0; i < 5; i++) {
				player.effect(function() {
					fire(player.x + player.radius, player.y + player.radius, 150, 150, 35, a, 200, jaxson.bullet.strong, {walls: function(w) {
						if (w == "minx") {
							this.x = 0;
							this.velx *= -1;
							this.rotation = 180 - this.rotation;
						}
						if (w == "maxx") {
							this.x = width - this.width;
							this.velx *= -1;
							this.rotation = 180 - this.rotation;
						}
						if (w == "miny") {
							this.y = 0;
							this.vely *= -1;
							this.rotation *= -1;
						}
						if (w == "maxy") {
							this.y = height - this.height;
							this.vely *= -1;
							this.rotation *= -1;
						}
					}});
				}, i * 10, i);
    		}
		}
	},
	spell:  {
		name: "Sick Slide",
		img: new Image(),
		cost: 300,
		max: 1000,
		charge: 3,
		cast: function (player) {
			a = player.angle();
			player.speed -= 0.5;
			player.friction = 1 - (1 - player.friction) / 100;
			player.velx = 30 * Math.cos(a * Math.PI / 180);
      		player.vely = 30 * Math.sin(a * Math.PI / 180);
      		player.velspin = 0;
      		player.effect(function() {
				player.friction = 1 - (1 - player.friction) * 100;
				player.speed += 0.5;
			}, 50);
		}
	},
	ult: {
		name: "Blizzard",
		img: new Image(),
		cost: 1000,
		max: 1000,
		charge: 1,
		cast: function (player) {
			a = player.angle();
			fire(player.x + player.radius, player.y + player.radius, 400, 400, 80, a, 400, jaxson.bullet.ice, {walls: function(w) {
				if (w == "minx") {
					this.x = 0;
					this.velx *= -1;
					this.rotation = 180 - this.rotation;
				}
				if (w == "maxx") {
					this.x = width - this.width;
					this.velx *= -1;
					this.rotation = 180 - this.rotation;
				}
				if (w == "miny") {
					this.y = 0;
					this.vely *= -1;
					this.rotation *= -1;
				}
				if (w == "maxy") {
					this.y = height - this.height;
					this.vely *= -1;
					this.rotation *= -1;
				}
			}});
		}
	},
	bullet: {
		strong: new Image(),
		ice: new Image(),
	},
	setup: function() {
		this.img.src = "Images/Jaxson/Hp.png"
		this.ult.img.src = "Images/Jaxson/Ult.png"
		this.spell.img.src = "Images/Jaxson/Spell.png"
		this.bullet.strong.src = "Images/Jaxson/Bullet.png"
		this.bullet.ice.src = "Images/Jaxson/Pekker.png"
	}
}
var mario = {
	img : new Image(),
	health: 1000,
	firerate: 0,
	speed: 0.5,
	attack:  {
		name: "Fireball",
		img: new Image(),
		cost: 200,
		cast: function (player) {
			a = player.angle();
			fire(player.x + player.radius, player.y + player.radius, 150, 150, 50, a, 300, mario.bullet.fire);
		}
	},
	spell:  {
		name: "Mushroom",
		img: new Image(),
		cost: 200,
		max: 1000,
		charge: 5,
		cast: function (player) {
			// player.Hp // workrkoawk
			player.x -= 40 * Math.sqrt(2);
			player.y -= 40 * Math.sqrt(2);
			player.radius += 60;
      		player.effect(function() {
				player.x += 40 * Math.sqrt(2);
				player.y += 40 * Math.sqrt(2);
				player.radius -= 60;
			}, 50);
		}
	},
	ult: {
		name: "Final Smash",
		img: new Image(),
		cost: 1000,
		max: 1000,
		charge: 1,
		cast: function (player) {
			a = player.angle();
			fire(player.x + player.radius, player.y + player.radius, 250, 250, 20, a, 300, mario.bullet.fire, {again: function() {
				if (frames % 20 == 0) {
					fire(this.x + this.width / 2, this.y + this.height / 2, 150, 150, 50, this.rotation + range(0, 20), 200, mario.bullet.fire);
				}
				if (frames % 20 == 10) {
					fire(this.x + this.width / 2, this.y + this.height / 2, 150, 150, 50, this.rotation + range(-20, 0), 200, mario.bullet.fire);
				}
			}});
		}
	},
	bullet: {
		fire: new Image(),
	},
	setup: function() {
		this.img.src = "Images/Basic/Mario/Hp.png"
		this.ult.img.src = "Images/Basic/Mario/Ult.png"
		this.spell.img.src = "Images/Basic/Mario/Spell.png"
		this.bullet.fire.src = "Images/Basic/Mario/Bullet.png"
	}
}
var boba = {
	img : new Image(),
	health: 1000,
	firerate: 0,
	speed: 0.5,
	attack:  {
		name: "Rockets",
		img: new Image(),
		cost: 400,
		cast: function (player) {
			a = player.angle();
			fire(player.x + player.radius + Math.sin((-a + 45) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a + 45) * Math.PI / 180) * player.radius, 150, 150, 50, a, 150, boba.bullet.fire);
			fire(player.x + player.radius + Math.sin((-a - 45) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a - 45) * Math.PI / 180) * player.radius, 150, 150, 50, a, 150, boba.bullet.fire);
			fire(player.x + player.radius + Math.sin((-a + 135) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a + 135) * Math.PI / 180) * player.radius, 150, 150, 50, a, 150, boba.bullet.fire);
			fire(player.x + player.radius + Math.sin((-a - 135) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a - 135) * Math.PI / 180) * player.radius, 150, 150, 50, a, 150, boba.bullet.fire);
		}
	},
	spell:  {
		name: "Blast",
		img: new Image(),
		cost: 600,
		max: 1000,
		charge: 7,
		cast: function (player) {
			// player.Hp // workrkoawk
			a = player.angle();
			fire(player.x + player.radius + Math.sin((-a + 90) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a + 90) * Math.PI / 180) * player.radius, 150, 150, 75, a, 150, boba.bullet.fire);
			fire(player.x + player.radius + Math.sin((-a - 30) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a - 30) * Math.PI / 180) * player.radius, 150, 150, 75, a, 150, boba.bullet.fire);
			fire(player.x + player.radius + Math.sin((-a + 210) * Math.PI / 180) * player.radius, player.y + player.radius + Math.cos((-a + 210) * Math.PI / 180) * player.radius, 150, 150, 75, a, 150, boba.bullet.fire);
			player.speed -= 0.5;
			player.velx = -60 * Math.cos(a * Math.PI / 180);
      		player.vely = -60 * Math.sin(a * Math.PI / 180);
      		player.velspin *= 2;
      		player.effect(function() {
				player.speed += 0.5;
			}, 10);
		}
	},
	ult: {
		name: "Bucket",
		img: new Image(),
		cost: 1000,
		max: 1000,
		charge: 1,
		cast: function (player) {
			a = player.angle();
			fire(player.x + player.radius, player.y + player.radius, 250, 250, 100, a, 30, boba.bullet.fire, {deathrattle: function() {
				for (i = 0; i < 36; i++) {
					fire(this.x + this.width / 2, this.y + this.height / 2, 150, 150, 50, a + i * 10, 500, boba.bullet.fire);
				}
			}});
		}
	},
	bullet: {
		fire: new Image(),
	},
	setup: function() {
		this.img.src = "Images/Basic/Boba/Hp.png"
		this.ult.img.src = "Images/Basic/Boba/Ult.png"
		this.spell.img.src = "Images/Basic/Boba/Spell.png"
		this.bullet.fire.src = "Images/Basic/Boba/Bullet.png"
	}
}
var punisher = {
	img : new Image(),
	health: 1000,
	firerate: 0,
	speed: 0.5,
	attack:  {
		name: "M4",
		img: new Image(),
		cost: 300,
		cast: function (player) {
			a = player.angle();
			if (player.temp.cult) {
				for (i = 0; i < 5; i++) {
					player.effect(function() {
						fire(player.x + player.radius + 100, player.y + player.radius + 100, 150, 150, 50, a + range(-10, 10), 100, punisher.bullet.fire);
						fire(player.x + player.radius + 100, player.y + player.radius - 100, 150, 150, 50, a + range(-10, 10), 100, punisher.bullet.fire);
						fire(player.x + player.radius - 100, player.y + player.radius + 100, 150, 150, 50, a + range(-10, 10), 100, punisher.bullet.fire);
						fire(player.x + player.radius - 100, player.y + player.radius - 100, 150, 150, 50, a + range(-10, 10), 100, punisher.bullet.fire);
					}, i*10, i);
				}
				player.temp.cult = false;
			} else {
				fire(player.x + player.radius + 100, player.y + player.radius + 100, 150, 150, 50, a + range(-2, 2), 50, punisher.bullet.fire);
				fire(player.x + player.radius + 100, player.y + player.radius - 100, 150, 150, 50, a + range(-2, 2), 50, punisher.bullet.fire);
				fire(player.x + player.radius - 100, player.y + player.radius + 100, 150, 150, 50, a + range(-2, 2), 50, punisher.bullet.fire);
				fire(player.x + player.radius - 100, player.y + player.radius - 100, 150, 150, 50, a + range(-2, 2), 50, punisher.bullet.fire);
			}
		}
	},
	spell:  {
		name: "Protecta",
		img: new Image(),
		cost: 300,
		max: 1000,
		charge: 5,
		cast: function (player) {
			a = player.angle();
			if (player.temp.cult) {
				for (i = 0; i < 6; i++) {
					player.effect(function() {
						for (i = 0; i < 6; i++) {
							fire(player.x + player.radius, player.y + player.radius, 150, 150, 50, a + range(-40, 40), 60, punisher.bullet.fire);
						}
					}, i*6, i);
				}
				player.temp.cult = false;
			} else {
				for (i = 0; i < 3; i++) {
					player.effect(function() {
						for (i = 0; i < 2; i++) {
							fire(player.x + player.radius, player.y + player.radius, 150, 150, 50, a + range(-30, 30), 20, punisher.bullet.fire);
						}
					}, i*3, i);
				}
			}
		}
	},
	ult: {
		name: "Sinister Cult",
		img: new Image(),
		cost: 1000,
		max: 1000,
		charge: 1,
		cast: function (player) {
			player.temp.cult = true;
		}
	},
	bullet: {
		fire: new Image(),
	},
	setup: function() {
		player.temp = {};
		this.img.src = "Images/Basic/Punisher/Hp.png"
		this.ult.img.src = "Images/Basic/Punisher/Ult.png"
		this.spell.img.src = "Images/Basic/Punisher/Spell.png"
		this.bullet.fire.src = "Images/Basic/Punisher/Bullet.png"
		player.temp.cult = false;
		player.temp.init = function (player) {
			if (player.ult == 1000) {
				player.temp.cult = false;
			} else {
				if (player.temp.cult) {
					firepix = new Image();
					firepix.src = "Images/Fire/tmp-"+Math.floor(frames/2)%17+".gif";
				    ctxgame.drawImage(firepix, player.x - player.radius * 2, player.y - player.radius * 4, player.radius * 6, player.radius * 6);
				}
			}
		}
		player.temp.passive = function (player) {
			if (player.temp.cult) {
				ctxgame.drawImage(player.ability == 1 ? player.character.ult.img : player.character.spell.img, player.x - player.radius/2, player.y - player.radius/2, player.radius * 3, player.radius * 3);
			}
		}
	}
}

