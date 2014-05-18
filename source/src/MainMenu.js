
TimesOfLores.MainMenu = function (game) {

	this.title;

	this.option1;
	this.option2;
	this.option3;

	this.tween;

};

TimesOfLores.MainMenu.prototype = {

	create: function () {

    	this.title = this.add.image(0, 0, 'title');

        this.option1 = this.add.image(0, 24, 'titlePlay');
        this.option2 = this.add.image(32, 24, 'titleHelp');
        this.option3 = this.add.image(-32, 24, 'titleCredits');

        TimesOfLores.cursors.up.onDown.add(this.chooseCharacter, this);
        TimesOfLores.spacebar.onDown.add(this.chooseCharacter, this);
        TimesOfLores.cursors.left.onDown.add(this.nextOption, this);
        TimesOfLores.cursors.right.onDown.add(this.prevOption, this);

        TimesOfLores.gamepadLeft.onDown.add(this.prevOption, this);
        TimesOfLores.gamepadRight.onDown.add(this.nextOption, this);
        TimesOfLores.gamepadA.onDown.add(this.chooseCharacter, this);

	},

    prevOption: function () {

        if (this.tween && this.tween.isRunning) { return; }

        this.add.tween(this.option1).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.option2).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.option3).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);

        this.tween.onComplete.add(this.reOrder, this);

    },

    nextOption: function () {

        if (this.tween && this.tween.isRunning) { return; }

        this.add.tween(this.option1).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.option2).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.option3).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);

        this.tween.onComplete.add(this.reOrder, this);

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

    },

    chooseCharacter: function () {

        this.state.start('CharacterSelect');

    },

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
