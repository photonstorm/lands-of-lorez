
TimesOfLores.Credits = function (game) {

	this.title;

	this.tween;
    this.data;
    this.rasters;
    this.scroller;
    this.pos = [];
    this.tune;

};

TimesOfLores.Credits.prototype = {

	create: function () {

        this.stage.backgroundColor = '#000000';

        //  Generate our motion data
        this.data = this.make.tween({ y: -8 }).to( { y: 32 }, 800, Phaser.Easing.Sinusoidal.InOut).yoyo(true).generateData(60);

        //  A group of rasters
        this.rasters = this.add.group();

        //  The total number + spacing between each one
        var total = 6;
        var offset = 4;

        for (var i = 0; i < total; i++)
        {
            var raster = this.rasters.create(0, 0, 'raster');
            raster.alpha = (i + 1) * (1 / total);
            this.pos.push(i * offset);
        }

        this.logo = this.add.image(32, 8, 'photonstorm');

    	this.scroller = this.add.image(100, 24, 'creditsScroller');

        TimesOfLores.spacebar.onDown.add(this.backToMenu, this);
        TimesOfLores.cursors.up.onDown.add(this.backToMenu, this);
        TimesOfLores.cursors.down.onDown.add(this.backToMenu, this);
        TimesOfLores.cursors.left.onDown.add(this.backToMenu, this);
        TimesOfLores.cursors.right.onDown.add(this.backToMenu, this);
        TimesOfLores.gamepadA.onDown.add(this.backToMenu, this);

        this.add.tween(this.logo).to( { x: -111 }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000000, true);
        this.add.tween(this.scroller).to( { x: -160 }, 10000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000000);

        this.tune = this.sound.play('credits', 1, true);

	},

    update: function () {

        this.rasters.resetCursor();

        for (var i = 0; i < this.rasters.total; i++)
        {
            this.pos[i]++;

            if (this.pos[i] === this.data.length)
            {
                this.pos[i] = 0;
            }

            this.rasters.cursor.y = this.data[this.pos[i]].y;
            this.rasters.next();
        }

    },

    backToMenu: function () {

        this.tune.stop();
        this.state.start('MainMenu');

    },

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
