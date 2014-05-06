
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

		this.load.spritesheet('key', 'images/key.png', 32, 32);
		this.load.spritesheet('potion', 'images/potion.png', 32, 32);
		this.load.spritesheet('frog', 'images/frog.png', 32, 32);

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
