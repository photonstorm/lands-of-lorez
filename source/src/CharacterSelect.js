TimesOfLores.CharacterSelect = function (game) {

    this.game = game;

    this.char1;
    this.char2;
    this.char3;

    this.current = 1;
    this.tween = null;

    this.cursors;

};

TimesOfLores.CharacterSelect.prototype = {

    create: function () {

        this.char1 = this.add.image(0, 0, 'characterSelect1');
        this.char2 = this.add.image(32, 0, 'characterSelect2');
        this.char3 = this.add.image(-32, 0, 'characterSelect3');

        this.current = 1;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.cursors.up.onDown.add(this.startGame, this);
        this.cursors.down.onDown.add(this.startGame, this);
        this.cursors.left.onDown.add(this.prevCharacter, this);
        this.cursors.right.onDown.add(this.nextCharacter, this);

    },

    prevCharacter: function () {

        if (this.tween && this.tween.isRunning) { return; }

        this.add.tween(this.char1).to( { x: "-32" }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.char2).to( { x: "-32" }, 500, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.char3).to( { x: "-32" }, 500, Phaser.Easing.Linear.None, true);

        this.tween.onComplete.add(this.reOrder, this);

    },

    nextCharacter: function () {

        if (this.tween && this.tween.isRunning) { return; }

        this.add.tween(this.char1).to( { x: "+32" }, 500, Phaser.Easing.Linear.None, true);
        this.add.tween(this.char2).to( { x: "+32" }, 500, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.char3).to( { x: "+32" }, 500, Phaser.Easing.Linear.None, true);

        this.tween.onComplete.add(this.reOrder, this);

    },

    reOrder: function () {

        if (this.char1.x === -64)
        {
            this.char1.x = 32;
        }
        else if (this.char1.x === 64)
        {
            this.char1.x = -32;
        }

        if (this.char2.x === -64)
        {
            this.char2.x = 32;
        }
        else if (this.char2.x === 64)
        {
            this.char2.x = -32;
        }

        if (this.char3.x === -64)
        {
            this.char3.x = 32;
        }
        else if (this.char3.x === 64)
        {
            this.char3.x = -32;
        }

    },

    startGame: function () {

        TimesOfLores.character = new TimesOfLores.Character(this, 10, 3, 6);

        this.state.start('Game');

    },

    render: function () {

        TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

    }

};
