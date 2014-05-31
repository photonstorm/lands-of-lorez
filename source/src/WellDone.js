TimesOfLores.WellDone = function (game) {

    this.game = game;

    this.cursors;

};

TimesOfLores.WellDone.prototype = {

    create: function () {

        this.add.image(0, 8, 'wellDone');

        TimesOfLores.cursors.up.onDown.add(this.nextLevel, this);
        TimesOfLores.cursors.down.onDown.add(this.nextLevel, this);
        TimesOfLores.spacebar.onDown.add(this.nextLevel, this);
        TimesOfLores.gamepadA.onDown.add(this.nextLevel, this);

        this.sound.play('level-won');

    },

    nextLevel: function () {

        TimesOfLores.level++;

        this.state.start('Game');

    },

    render: function () {

        TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

    }

};
