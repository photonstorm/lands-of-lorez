
TimesOfLores.Help = function (game) {

	this.scroll;

};

TimesOfLores.Help.prototype = {

	create: function () {

        this.stage.backgroundColor = '#000000';

    	this.scroll = this.add.image(0, 32, 'help');

        // TimesOfLores.gamepadUp.onDown.add(this.scrollUp, this);
        // TimesOfLores.gamepadDown.onDown.add(this.scrollDown, this);

        TimesOfLores.cursors.left.onDown.add(this.backToMenu, this);
        TimesOfLores.cursors.right.onDown.add(this.backToMenu, this);
        TimesOfLores.spacebar.onDown.add(this.backToMenu, this);

        TimesOfLores.gamepadA.onDown.add(this.backToMenu, this);

        this.add.tween(this.scroll).to( { y: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);

	},

    update: function () {

        if (TimesOfLores.cursors.down.isDown && this.scroll.y >= -132)
        {
            this.scroll.y -= 1;
        }
        else if (TimesOfLores.cursors.up.isDown && this.scroll.y < 0)
        {
            this.scroll.y += 1;
        }

    },

    backToMenu: function () {

        this.state.start('MainMenu');

    },

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
