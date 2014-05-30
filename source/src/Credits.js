
TimesOfLores.Credits = function (game) {

	this.title;

	this.tween;
    this.data;
    this.rasters;
    this.pos = [];

};

TimesOfLores.Credits.prototype = {

	create: function () {

        this.stage.backgroundColor = '#000000';

        //  Generate our motion data
        this.data = this.make.tween({ y: 0 }).to( { y: 32 }, 700, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(60);

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

        TimesOfLores.spacebar.onDown.add(this.backToMenu, this);
        TimesOfLores.gamepadA.onDown.add(this.backToMenu, this);

        this.add.tween(this.logo).to( { x: -111 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100000, true);

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

        this.state.start('MainMenu');

    },

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
