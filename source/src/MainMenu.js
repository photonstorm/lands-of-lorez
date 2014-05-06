
ArcadeStorm.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

ArcadeStorm.MainMenu.prototype = {

	create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

    	this.add.image(0, 0, 'title');

    	this.input.onDown.add(this.checkClick, this);

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

	},

	checkClick: function (pointer) {

		if (pointer.y < 192)
		{
			if (pointer.x < 170)
			{
				this.startBomber();
			}
			else if (pointer.x > 338)
			{
				this.startMissile();
			}
			else
			{
				this.startSnake();
			}
		}

	},

	update: function () {

	},

	startBomber: function (pointer) {

		// this.music.stop();
		this.state.start('Bomber.Preloader');

	},

	startMissile: function (pointer) {

		// this.music.stop();
		this.state.start('MissileCommand.Preloader');

	},

	startSnake: function (pointer) {

		// this.music.stop();
		this.state.start('Snake.Preloader');

	}

};
