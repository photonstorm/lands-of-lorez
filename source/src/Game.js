
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

};

TimesOfLores.Game.prototype = {

    create: function () {

        this.levelData = this.add.tilemap('map');
        this.levelData.setCollisionByIndex(2);

        //  1 x 14 = map start coordinates (move to per level var)
        this.walker = new Phaser.Plugin.TilemapWalker(this.game, this.levelData, this.levelData.currentLayer, 1, 14);

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

        this.map.refresh();

    },

    moveForward: function () {

        if (!this.checkKey()) { return; }

        if (this.map.canPass(0) && this.walker.moveForward())
        {
            this.map.refresh();
            this.checkCurrentTile();
        }

    },

    turnLeft: function () {

        if (!this.checkKey()) { return; }

        this.walker.turnLeft();
        this.map.refresh();

    },

    turnRight: function () {

        if (!this.checkKey()) { return; }

        this.walker.turnRight();
        this.map.refresh();

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
            // else if (tile.index === 8)
            // {
                //  Gold (needs UI fx) - not currently in the map, will swap for diamonds / treasure
                // this.character.gold++;
                // this.walker.putTile(-1);
            // }
            else if (tile.index === 6)
            {
                //  Baddie! (10 = baddie health, needs moving to enemy stats class)
                this.fight.display(10);
            }
        }

    },

    update: function () {

    },

    render: function () {

        TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

    }

};