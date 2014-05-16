
TimesOfLores.MiniMap = function (state) {

    this.walker = state.walker;

    this.mapBMD = state.make.bitmapData(32, 32);

    Phaser.Image.call(this, game, 0, 0, this.mapBMD);

    this.mapColors = [ '#000000', '#6e6e6e', '#4e3d33', '#95a8be', '#fedd00', '#64b732', '#ff3d6a', '#ff3d6a', '#ff3d6a', '#ff3d6a', '#ff3d6a', '#ff3d6a', '#ff3dff', '#6e6e6e', '#efefef' ];
    this.mapShadow = '#3e281b';

    this.game.world.add(this);

    this.visible = false;

};

TimesOfLores.MiniMap.prototype = Object.create(Phaser.Image.prototype);
TimesOfLores.MiniMap.prototype.constructor = TimesOfLores.MiniMap;

TimesOfLores.MiniMap.prototype.display = function () {

    this.mapBMD.fill(110, 110, 110, 1);

    var data = this.walker.getMiniMap(16, 16); // reference missing

console.log(data);

    var i = 0;
    var dx = 0;
    var dy = 0;

    //  Paint down the walls
    for (y = 0; y < 16; y++)
    {
        for (x = 0; x < 16; x++)
        {
            i = data.tiles[y][x];

            if (i >= 0 && i <= 2)
            {
                this.mapBMD.rect(dx, dy, 2, 2, this.mapColors[i]);
            }

            dx += 2;
        }

        dx = 0;
        dy += 2;
    }

    dx = 0;
    dy = 0;

    //  Then the objects
    for (y = 0; y < 16; y++)
    {
        for (x = 0; x < 16; x++)
        {
            i = data.tiles[y][x];

            if (i > 2 && i !== 13)
            {
                this.mapBMD.rect(dx, dy, 2, 3, this.mapShadow);
                this.mapBMD.rect(dx, dy, 2, 2, this.mapColors[i]);
            }

            dx += 2;
        }

        dx = 0;
        dy += 2;
    }

    //  Finally the player
    this.mapBMD.rect(data.walker.x * 2, data.walker.y * 2, 2, 3, this.mapShadow);
    this.mapBMD.rect(data.walker.x * 2, data.walker.y * 2, 2, 2, '#ffffff');

    this.visible = true;

};