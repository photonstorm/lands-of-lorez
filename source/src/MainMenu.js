
TimesOfLores.MainMenu = function (game) {

    this.title;
	this.title2;

	this.option1;
	this.option2;
	this.option3;

    this.current = 1;

    this.tune;
	this.tween;

};

TimesOfLores.MainMenu.prototype = {

	create: function () {

        this.title = this.add.image(0, 0, 'title');
    	this.title2 = this.add.image(0, 0, 'title2');
        this.title2.alpha = 0;

        this.option1 = this.add.image(0, 24, 'titlePlay');
        this.option2 = this.add.image(32, 24, 'titleHelp');
        this.option3 = this.add.image(-32, 24, 'titleCredits');

        TimesOfLores.cursors.up.onDown.add(this.select, this);
        TimesOfLores.spacebar.onDown.add(this.select, this);
        TimesOfLores.cursors.left.onDown.add(this.nextOption, this);
        TimesOfLores.cursors.right.onDown.add(this.prevOption, this);

        TimesOfLores.gamepadLeft.onDown.add(this.prevOption, this);
        TimesOfLores.gamepadRight.onDown.add(this.nextOption, this);
        TimesOfLores.gamepadA.onDown.add(this.select, this);

        this.current = 1;

        this.startFlicker();

        this.sound.play('music-intro');
        this.tune = this.sound.play('fire', 0.3, true);

	},

    startFlicker: function () {

        var tween = this.add.tween(this.title2).to( { alpha: 1 }, this.rnd.integerInRange(50, 150), Phaser.Easing.Linear.None);
        tween.onComplete.add(this.fadeFlicker, this);
        tween.start();

    },

    fadeFlicker: function () {

        var tween = this.add.tween(this.title2).to( { alpha: 0 }, this.rnd.integerInRange(50, 150), Phaser.Easing.Linear.None);
        tween.onComplete.add(this.startFlicker, this);
        tween.start();

    },

    prevOption: function () {

        if (this.tween && this.tween.isRunning) { return; }

        this.add.tween(this.option1).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.option2).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.option3).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);

        this.tween.onComplete.add(this.reOrder, this);

        this.sound.play('whoosh');

    },

    nextOption: function () {

        if (this.tween && this.tween.isRunning) { return; }

        this.add.tween(this.option1).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.option2).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.option3).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);

        this.tween.onComplete.add(this.reOrder, this);

        this.sound.play('whoosh');

    },

    reOrder: function () {

        if (this.option1.x === -64)
        {
            this.option1.x = 32;
        }
        else if (this.option1.x === 64)
        {
            this.option1.x = -32;
        }

        if (this.option2.x === -64)
        {
            this.option2.x = 32;
        }
        else if (this.option2.x === 64)
        {
            this.option2.x = -32;
        }

        if (this.option3.x === -64)
        {
            this.option3.x = 32;
        }
        else if (this.option3.x === 64)
        {
            this.option3.x = -32;
        }

        if (this.option1.x === 0)
        {
            this.current = 1;
        }
        else if (this.option2.x === 0)
        {
            this.current = 2;
        }
        else if (this.option3.x === 0)
        {
            this.current = 3;
        }

    },

    select: function () {

        this.tune.stop();
        this.sound.play('select');

        if (this.current === 1)
        {
            this.state.start('CharacterSelect');
        }
        else if (this.current === 2)
        {
            this.state.start('Help');
        }
        else if (this.current === 3)
        {
            this.state.start('Credits');
        }

    },

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
