TimesOfLores.CharacterSelect = function (game) {

    this.game = game;

    this.char1;
    this.char2;
    this.char3;

    this.prev;
    this.next;

    this.current = 1;
    this.tween = null;

    this.cursors;

};

TimesOfLores.CharacterSelect.prototype = {

    create: function () {

        this.char1 = this.add.image(-32, 0, 'characterSelect1');
        this.char2 = this.add.image(0, 0, 'characterSelect2');
        this.char3 = this.add.image(32, 0, 'characterSelect3');

        this.prev = this.add.image(1, 18, 'characterSelectLeft');
        this.next = this.add.image(28, 18, 'characterSelectRight');

        this.current = 2;

        TimesOfLores.cursors.up.onDown.add(this.startGame, this);
        TimesOfLores.cursors.down.onDown.add(this.startGame, this);
        TimesOfLores.spacebar.onDown.add(this.startGame, this);
        TimesOfLores.cursors.left.onDown.add(this.prevCharacter, this);
        TimesOfLores.cursors.right.onDown.add(this.nextCharacter, this);

        TimesOfLores.gamepadLeft.onDown.add(this.prevCharacter, this);
        TimesOfLores.gamepadRight.onDown.add(this.nextCharacter, this);
        TimesOfLores.gamepadA.onDown.add(this.startGame, this);

    },

    prevCharacter: function () {

        if (this.current === 1 || (this.tween && this.tween.isRunning)) { return; }

        this.current--;

        this.add.tween(this.char1).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.char2).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.char3).to( { x: "+32" }, 250, Phaser.Easing.Linear.None, true);

        this.sound.play('whoosh');

    },

    nextCharacter: function () {

        if (this.current === 3 || (this.tween && this.tween.isRunning)) { return; }

        this.current++;

        this.add.tween(this.char1).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);
        this.add.tween(this.char2).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.char3).to( { x: "-32" }, 250, Phaser.Easing.Linear.None, true);

        this.sound.play('whoosh');

    },

    startGame: function () {

        TimesOfLores.character = new TimesOfLores.Character(this, this.current);

        console.log('current: ', this.current);

        this.sound.play('select');

        this.state.start('Game');

    },

    update: function () {

        if (this.current === 1)
        {
            this.prev.visible = false;
            this.next.visible = true;
        }
        else if (this.current === 2)
        {
            this.prev.visible = true;
            this.next.visible = true;
        }
        else if (this.current === 3)
        {
            this.prev.visible = true;
            this.next.visible = false;
        }

    },

    render: function () {

        TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

    }

};
