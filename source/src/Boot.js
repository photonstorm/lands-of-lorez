TimesOfLores = {

    score: 0,
    music: null,

    width: 256,
    height: 256,

    pixelCanvas: null,
    pixelContext: null

};

TimesOfLores.Boot = function (game) {
};

TimesOfLores.Boot.prototype = {

    preload: function () {

        this.load.image('preloaderBar', 'images/preload.png');

    },

    create: function () {

        TimesOfLores.pixelCanvas = document.getElementById('pixel');
        TimesOfLores.pixelContext = TimesOfLores.pixelCanvas.getContext('2d');
        TimesOfLores.width = TimesOfLores.pixelCanvas.width;
        TimesOfLores.height = TimesOfLores.pixelCanvas.height;

        Phaser.Canvas.setSmoothingEnabled(TimesOfLores.pixelContext, false);

        this.input.maxPointers = 1;

        this.stage.disableVisibilityChange = true;

        this.stage.backgroundColor = 0xff2b0e1e;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preloader');

    }

};

var game;

window.onload = function () {

    game = new Phaser.Game(32, 32, Phaser.CANVAS, 'game');

    game.state.add('Boot', TimesOfLores.Boot);
    game.state.add('Preloader', TimesOfLores.Preloader);
    game.state.add('Game', TimesOfLores.Game);
    // game.state.add('MainMenu', TimesOfLores.MainMenu);

    game.state.start('Boot');

}
