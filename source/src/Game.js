
TimesOfLores.Game = function (game) {

    this.game = game;

    this.levelData;

    this.walker;
    this.character;
    this.map;
    this.ui;
    this.minimap;
    this.fight;

    this.cursors;

    this._location = new Phaser.Point();
    this._facing = 0;

};

TimesOfLores.Game.prototype = {

    create: function () {

        this.levelData = this.add.tilemap('map');
        this.levelData.setCollisionByIndex(2);

        //  1 x 14 = map start coordinates (move to per level var)
        this.walker = new Phaser.Plugin.TilemapWalker(this.game, this.levelData, this.levelData.currentLayer, 1, 14);

        this._location.copyFrom(this.walker.location);
        this._facing = this.walker.facing;

        this.character = new TimesOfLores.Character(this, 10, 3, 6);
        this.map = new TimesOfLores.Map(this);
        this.ui = new TimesOfLores.UI(this);
        this.minimap = new TimesOfLores.MiniMap(this);
        this.fight = new TimesOfLores.FightScreen(this);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.cursors.up.onDown.add(this.moveForward, this);
        this.cursors.down.onDown.add(this.showMap, this);
        this.cursors.left.onDown.add(this.turnLeft, this);
        this.cursors.right.onDown.add(this.turnRight, this);

        this.input.gamepad.start();

        var leftButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
        leftButton.onDown.add(this.turnLeft, this);

        var rightButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        rightButton.onDown.add(this.turnRight, this);

        var upButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_UP);
        upButton.onDown.add(this.moveForward, this);

        var downButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);
        downButton.onDown.add(this.moveBackward, this);

        var stepLeftButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        stepLeftButton.onDown.add(this.stepLeft, this);

        var stepRightButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
        stepRightButton.onDown.add(this.stepRight, this);

        var aButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_A);
        aButton.onDown.add(this.fight.hit, this.fight);

        var xButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_X);
        xButton.onDown.add(this.showMap, this);

        this.map.refresh();

    },

    moveForward: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(0))
        {
            this.walker.moveForward();
        }

    },

    moveBackward: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(2))
        {
            this.walker.moveBackward();
        }

    },

    stepLeft: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(1))
        {
            this.walker.moveLeft();
        }

    },

    stepRight: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(3))
        {
            this.walker.moveRight();
        }

    },

    turnLeft: function () {

        if (!this.checkKey()) { return; }

        this.walker.turnLeft();

    },

    turnRight: function () {

        if (!this.checkKey()) { return; }

        this.walker.turnRight();

    },

    showMap: function () {

        if (!this.checkKey()) { return; }

        this.minimap.display();

    },

    checkKey: function () {

        //  All need moving
        if (this.minimap.visible)
        {
            this.minimap.visible = false;
            return false;
        }

        if (this.fight.visible)
        {
            if (this.fight.yourFightMove)
            {
                this.fight.hit();
            }
                
            return false;
        }

        //  They are allowed to move
        return true;

    },

    checkCurrentTile: function () {

        var tile = this.walker.getTile();

        console.log('current tile is', tile);

        if (tile)
        {
            if (tile.index === 3)
            {
                //  Was locked, but now walked through it
                this.walker.putTile(-1);
            }
            else if (tile.index === 4)
            {
                this.ui.pickUpKey();
            }
            else if (tile.index === 5)
            {
                if (this.character.health < 10)
                {
                    this.ui.pickUpPotion();
                }
            }
            else if (tile.index >= 7 && tile.index <= 11)
            {
                //  Baddie! (10 = baddie health, needs moving to enemy stats class)
                this.fight.display(10);
            }
            //  12 = cat, 13 = start, 14 = exit
        }

    },

    update: function () {

        //  If the player moves or turns we'll adjust the map automatically

        if (!this._location.equals(this.walker.location) || this._facing !== this.walker.facing)
        {
            this.map.refresh();
            this.checkCurrentTile();
            this._location.copyFrom(this.walker.location);
            this._facing = this.walker.facing;
        }

    },

    render: function () {

        TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

    }

};