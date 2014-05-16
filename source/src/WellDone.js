TimesOfLores.WellDone = function (game) {

    this.game = game;

    this.cursors;

};

TimesOfLores.WellDone.prototype = {

    create: function () {

        this.add.image(0, 0, 'wellDone');

        this.cursors = game.input.keyboard.createCursorKeys();

        this.cursors.up.onDown.add(this.nextLevel, this);
        this.cursors.down.onDown.add(this.nextLevel, this);
        this.cursors.left.onDown.add(this.nextLevel, this);
        this.cursors.right.onDown.add(this.nextLevel, this);

    },

    nextLevel: function () {

        TimesOfLores.level++;

        this.state.start('Game');

    },

    render: function () {

        TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

    }

};
