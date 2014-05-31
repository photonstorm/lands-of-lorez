TimesOfLores = {

    score: 0,
    music: null,

    level: 1,
    character: null,
    cheatInvin: false,
    cheatKeys: false,

    width: 256,
    height: 256,

    cursors: null,
    spacebar: null,

    gamepadLeft: null,
    gamepadRight: null,
    gamepadUp: null,
    gamepadDown: null,
    gamepadLeftButton: null,
    gamepadRightButton: null,
    gamepadA: null,
    gamepadX: null,

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
        this.input.gamepad.start();

        TimesOfLores.gamepadLeftButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
        TimesOfLores.gamepadRightButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        TimesOfLores.gamepadUp = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_UP);
        TimesOfLores.gamepadDown = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);
        TimesOfLores.gamepadLeft = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        TimesOfLores.gamepadRight = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
        TimesOfLores.gamepadA = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_A);
        TimesOfLores.gamepadX = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_X);

        TimesOfLores.cursors = this.input.keyboard.createCursorKeys();
        TimesOfLores.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.stage.disableVisibilityChange = true;

        this.stage.backgroundColor = 0xff2b0e1e;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        if (window['mapLevel'])
        {
            TimesOfLores.level = window['mapLevel'];
            console.log('Level set to', TimesOfLores.level);
        }

        if (window['mapInvin'] === 'y')
        {
            TimesOfLores.cheatInvin = true;
            console.log('Cheat Mode: Invincible');
        }

        if (window['mapKeys'] === 'y')
        {
            TimesOfLores.cheatKeys = true;
            console.log('Cheat Mode: Lock Picker');
        }

        this.state.start('Preloader');

    }

};

var game;

window.onload = function () {

    game = new Phaser.Game(32, 32, Phaser.CANVAS, 'game');

    game.state.add('Boot', TimesOfLores.Boot);
    game.state.add('Preloader', TimesOfLores.Preloader);
    game.state.add('Credits', TimesOfLores.Credits);
    game.state.add('Help', TimesOfLores.Help);
    game.state.add('MainMenu', TimesOfLores.MainMenu);
    game.state.add('CharacterSelect', TimesOfLores.CharacterSelect);
    game.state.add('Game', TimesOfLores.Game);
    game.state.add('GameOver', TimesOfLores.GameOver);
    game.state.add('GameWon', TimesOfLores.GameWon);
    game.state.add('WellDone', TimesOfLores.WellDone);

    game.state.start('Boot');

}
