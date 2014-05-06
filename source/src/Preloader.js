
ArcadeStorm.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

ArcadeStorm.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('title', 'images/title.jpg');
		this.load.image('photonstorm', 'images/photonstorm.png');
		this.load.bitmapFont('rollingThunder', 'images/fonts/rolling-thunder.png', 'images/fonts/rolling-thunder.xml');

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
