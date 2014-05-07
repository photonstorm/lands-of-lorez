
TimesOfLores.Preloader = function (game) {

	this.preloadBar = null;

	this.ready = false;

};

TimesOfLores.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 14, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('wall0', 'images/wall0.png');
		this.load.image('wall1', 'images/wall1.png');
		this.load.image('wall2', 'images/wall2.png');
		this.load.image('wall3', 'images/wall3.png');
		this.load.image('wall4', 'images/wall4.png');
		this.load.image('wall5', 'images/wall5.png');
		this.load.image('wall6', 'images/wall6.png');
		this.load.image('wall7', 'images/wall7.png');
		this.load.image('wall8', 'images/wall8.png');

		this.load.image('lock3', 'images/wall3-lock.png');
		this.load.image('lock6', 'images/wall6-lock.png');

		this.load.image('key3', 'images/key3.png');
		this.load.image('key6', 'images/key6.png');

		this.load.image('potion3', 'images/potion3.png');
		this.load.image('potion6', 'images/potion6.png');

		this.load.image('frog3', 'images/frog3.png');
		this.load.image('frog6', 'images/frog6.png');

		this.load.image('gold3', 'images/gold3.png');
		this.load.image('gold6', 'images/gold6.png');

		this.load.spritesheet('nsew', 'images/nsew.png', 5, 6);
		
		this.load.image('digits', 'images/digits.png');

		this.load.image('healthBG', 'images/health-bg.png');
		this.load.image('health', 'images/health-fill.png');

		this.load.image('enemyBG', 'images/enemy-bg.png');
		this.load.image('enemy', 'images/enemy-fill.png');
		this.load.image('gauge', 'images/enemy-gauge.png');
		this.load.image('attack', 'images/attack-bar.png');

		this.load.image('panel', 'images/panel.png');

	    this.load.tilemap('map', 'maps.json', null, Phaser.Tilemap.TILED_JSON);

	},

	create: function () {

		this.preloadBar.cropEnabled = false;

		this.state.start('MainMenu');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};
