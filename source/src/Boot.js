ArcadeStorm = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check ArcadeStorm.orientated in internal loops to know if it should pause or not */
    orientated: false

};

ArcadeStorm.Boot = function (game) {
};

ArcadeStorm.Boot.prototype = {

    preload: function () {

        this.load.image('preloaderBar', 'images/preload.png');

    },

    create: function () {

        this.input.maxPointers = 1;
        // this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 512;
            this.scale.minHeight = 384;
            this.scale.maxWidth = 512;
            this.scale.maxHeight = 384;
            // this.scale.maxWidth = 1024;
            // this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 512;
            this.scale.minHeight = 384;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {

        ArcadeStorm.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        ArcadeStorm.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};

var game;

window.onload = function () {

    // var game = new Phaser.Game(512, 384, Phaser.CANVAS, 'game');
    game = new Phaser.Game(512, 384, Phaser.CANVAS, 'game');

    game.state.add('Boot', ArcadeStorm.Boot);
    game.state.add('Preloader', ArcadeStorm.Preloader);
    game.state.add('MainMenu', ArcadeStorm.MainMenu);

    game.state.add('Bomber.Preloader', Bomber.Preloader);
    game.state.add('Bomber.MainMenu', Bomber.MainMenu);
    game.state.add('Bomber.Game', Bomber.Game);

    game.state.add('MissileCommand.Preloader', MissileCommand.Preloader);
    game.state.add('MissileCommand.MainMenu', MissileCommand.MainMenu);
    game.state.add('MissileCommand.Game', MissileCommand.Game);

    game.state.add('Snake.Preloader', Snake.Preloader);
    game.state.add('Snake.MainMenu', Snake.MainMenu);
    game.state.add('Snake.Game', Snake.Game);

    game.state.start('Boot');

}
