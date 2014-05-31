
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

    this.completed = false;
    this._location = new Phaser.Point();
    this._facing = 0;

};

TimesOfLores.Game.prototype = {

    create: function () {

        this.levelData = this.add.tilemap('map');

        this.levelData.setLayer('Level ' + TimesOfLores.level);

        this.levelData.setCollisionByIndex(2);

        var startTile = this.levelData.searchTileIndex(13);

        this.walker = new Phaser.Plugin.TilemapWalker(this.game, this.levelData, this.levelData.currentLayer, startTile.x, startTile.y);

        this._location.copyFrom(this.walker.location);
        this._facing = this.walker.facing;

        this.character = TimesOfLores.character;
        this.map = new TimesOfLores.Map(this);
        this.ui = new TimesOfLores.UI(this);
        this.minimap = new TimesOfLores.MiniMap(this);
        this.fight = new TimesOfLores.FightScreen(this);

        TimesOfLores.cursors.up.onDown.add(this.moveForward, this);
        TimesOfLores.cursors.down.onDown.add(this.showMap, this);
        TimesOfLores.cursors.left.onDown.add(this.turnLeft, this);
        TimesOfLores.cursors.right.onDown.add(this.turnRight, this);

        TimesOfLores.gamepadLeftButton.onDown.add(this.turnLeft, this);
        TimesOfLores.gamepadRightButton.onDown.add(this.turnRight, this);
        TimesOfLores.gamepadUp.onDown.add(this.moveForward, this);
        TimesOfLores.gamepadDown.onDown.add(this.moveBackward, this);
        TimesOfLores.gamepadLeft.onDown.add(this.stepLeft, this);
        TimesOfLores.gamepadRight.onDown.add(this.stepRight, this);
        TimesOfLores.gamepadA.onDown.add(this.fight.hit, this.fight);
        TimesOfLores.gamepadX.onDown.add(this.showMap, this);

        this.completed = false;
        this.ui.openDoor.visible = false;

        this.map.refresh();

        if (TimesOfLores.level === 1)
        {
            this.ui.showIntro1();
        }
        else
        {
            this.ui.showIntro2();
        }

    },

    moveForward: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(0))
        {
            //  Is it the exit?
            if (this.walker.getTileAhead().index === 14)
            {
                this.openDoor();
            }
            else
            {
                this.sound.play('footstep' + this.rnd.integerInRange(1,4));
                this.walker.moveForward();
            }
        }

    },

    moveBackward: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(2))
        {
            this.sound.play('footstep' + this.rnd.integerInRange(1,4));
            this.walker.moveBackward();
        }

    },

    stepLeft: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(1))
        {
            this.sound.play('footstep' + this.rnd.integerInRange(1,4));
            this.walker.moveLeft();
        }

    },

    stepRight: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(3))
        {
            this.sound.play('footstep' + this.rnd.integerInRange(1,4));
            this.walker.moveRight();
        }

    },

    turnLeft: function () {

        if (!this.checkKey()) { return; }

        this.sound.play('footstep' + this.rnd.integerInRange(1,4));
        this.walker.turnLeft();

    },

    turnRight: function () {

        if (!this.checkKey()) { return; }

        this.sound.play('footstep' + this.rnd.integerInRange(1,4));
        this.walker.turnRight();

    },

    showMap: function () {

        if (!this.checkKey()) { return; }

        this.minimap.display();
        
        this.sound.play('whoosh');

    },

    checkKey: function () {

        if (this.ui.intro1.visible)
        {
            this.ui.hideIntro1();
            return;
        }

        if (this.ui.intro2.visible)
        {
            this.ui.hideIntro2();
            return;
        }

        if (this.completed)
        {
            return;
        }

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
            if (tile.index === 3 || tile.index === 6)
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
                this.fight.display(tile.index);
            }
            //  12 = cat, 13 = start, 14 = exit
            else if (tile.index === 14)
            {
                // this.openDoor();
            }
        }

    },

    openDoor: function () {

        this.completed = true;

        this.ui.openDoor.visible = true;

        this.time.events.add(2000, this.gotoWellDone, this);

    },

    gotoWellDone: function () {

        this.state.start('WellDone');

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