TimesOfLores = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
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
    game.state.add('MainMenu', TimesOfLores.MainMenu);

    // game.state.add('Bomber.Preloader', Bomber.Preloader);
    // game.state.add('Bomber.MainMenu', Bomber.MainMenu);
    // game.state.add('Bomber.Game', Bomber.Game);

    // game.state.add('MissileCommand.Preloader', MissileCommand.Preloader);
    // game.state.add('MissileCommand.MainMenu', MissileCommand.MainMenu);
    // game.state.add('MissileCommand.Game', MissileCommand.Game);

    // game.state.add('Snake.Preloader', Snake.Preloader);
    // game.state.add('Snake.MainMenu', Snake.MainMenu);
    // game.state.add('Snake.Game', Snake.Game);

    game.state.start('Boot');

}
