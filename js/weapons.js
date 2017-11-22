weapon = {
	s: {
		name: "Single Shot",
		shell: {
			shoot: function (player) {
				fire(150, 200, player.x + player.width/2, player.y + player.height/2, 150, 150, 25 + player.power, a, 400, pekker);
			},
			ammo: 10,
			rarity: "common",
		},
		nuke: {
			shoot: function () {
				fire(150, 200, player.x + player.width/2, player.y + player.height/2, 150, 150, 25 + player.power, a, 400, pekker);
			},
			ammo: 10,
			rarity: "common",
		},
		missile: {
			shoot: function () {

			},
			ammo: 10,
			rarity: "common",
		}
	},
	m: {
		name: "Muti Shot",
		buckshot: {
			shoot: function () {

			},
			ammo: 10,
			rarity: "common",
		}
	},
	c: {
		name: "Cluster Shot",
		clusterbomb: {
			shoot: function () {

			},
			ammo: 10,
			rarity: "common",
		}
	},
	z: {
		name: "Animal",
		eagle: {
			shoot: function () {

			},
			ammo: 10,
			rarity: "common",
		}
	},
	u: {
		name: "Utility",
		barrier: {
			shoot: function () {

			},
			ammo: 10,
			rarity: "common",
		}
	},
}