
TimesOfLores.Map = function (state) {

    Phaser.Group.call(this, state.game);

    this.walker = state.walker;
    this.character = state.character;

    //  bg
    this.wall0 = this.create(0, 0, 'wall0');

    //  far
    this.wall1 = this.create(0, 0, 'wall1');
    this.wall2 = this.create(0, 0, 'wall2');
    this.wall3 = this.create(0, 0, 'wall3');

    this.itemsFar = this.create(0, 0, 'itemsFar', 0);

    //  mid
    this.wall4 = this.create(0, 0, 'wall4');
    this.wall5 = this.create(0, 0, 'wall5');
    this.wall6 = this.create(0, 0, 'wall6');

    this.itemsMid = this.create(0, 0, 'itemsMid', 0);

    //  near
    this.wall7 = this.create(0, 0, 'wall7');
    this.wall8 = this.create(0, 0, 'wall8');

    this.itemsNear = this.create(0, 0, 'itemsNear', 0);

    //  Map
    this.walls = [
        [ this.wall1, this.wall3, this.wall2 ],
        [ this.wall4, this.wall6, this.wall5 ],
        [ this.wall7, this.wall0, this.wall8 ]
    ];

    return this;

}

TimesOfLores.Map.prototype = Object.create(Phaser.Group.prototype);
TimesOfLores.Map.prototype.constructor = TimesOfLores.Map;

/**
 * Show a single wall piece
 *
 * @method showWall
 * @param {Phaser.Image} wall - Wall piece
  */
TimesOfLores.Map.prototype.showWall = function (wall) {

    wall.visible = true;

    //  Provides wall-bob effect
    if (wall.key !== 'wall3' && wall.key !== 'wall6')
    {
        if (wall.frame === 0)
        {
            wall.frame = 1;
        }
        else
        {
            wall.frame = 0;
        }
    }

};

TimesOfLores.Map.prototype.canPass = function (direction) {

    var index = 0;

    if (direction === 0)
    {
        index = this.walker.getTileAhead().index;
    }
    else if (direction === 1)
    {
        index = this.walker.getTileLeft().index;
    }
    else if (direction === 2)
    {
        index = this.walker.getTileBehind().index;
    }
    else if (direction === 3)
    {
        index = this.walker.getTileRight().index;
    }

    if (index === 3)
    {
        if (this.character.keys > 0)
        {
            this.character.keys--;
            return true;
        }
    }
    else
    {
        //  Not a locked door? Let them pass anyway then!
        return true;
    }
    
    //  You shall not pass!
    return false;

};

TimesOfLores.Map.prototype.refresh = function () {

    this.setAll('visible', false);

    this.showWall(this.wall0);

    var tiles = this.walker.getTiles(3, 3);
    var i = 0;

    for (y = 0; y < 3; y++)
    {
        for (x = 0; x < 3; x++)
        {
            i = tiles[y][x];

            if (i === 2)
            {
                this.showWall(this.walls[y][x]);
            }
            else if (i === 3)
            {
                //  Locked wall door thingy (finally)
                if (x === 1 && y === 0)
                {
                    this.itemsFar.visible = true;
                    this.itemsFar.frame = 0;
                }
                else if (x === 1 && y === 1)
                {
                    this.itemsMid.visible = true;
                    this.itemsMid.frame = 0;
                }
                else
                {
                    this.showWall(this.walls[y][x]);
                }
            }
            //  tile ids, 1 = nothing, 2 = wall, 3 = locked door, 4 = key, 5 = potion,, 6 = empty, 7 = frog, 8 = duck, 9 = red, 10 = bat, 11 = snake, 12 = cat, 13 = start, 14 = exit
            else if (i > 3)
            {
                //  sprite sheet index
                //  0 - lock, 1 = key, 2 = potion, 3 = exit, 4 = frog, 5 = duck, 6 = red, 7 = bat, 8 = snake, 9 = cat

                if (x === 1 && y === 0)
                {
                    this.itemsFar.visible = true;
                    this.itemsFar.frame = i - 3;
                }
                else if (x === 1 && y === 1)
                {
                    this.itemsMid.visible = true;
                    this.itemsMid.frame = i - 3;
                }
                else if (x === 1 && y === 2)
                {
                    this.itemsNear.visible = true;
                    this.itemsNear.frame = i - 3;
                }
            }
        }
    }

}