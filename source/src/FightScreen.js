
TimesOfLores.FightScreen = function (state) {

    Phaser.Group.call(this, state.game);

    this.state = state;
    this.walker = state.walker;
    this.character = state.character;

    this.enemy = null;
    this.enemyHealthBG = this.create(21, 1, 'enemyBG');
    this.enemyHealthFill = this.create(21, 1, 'enemy');

    this.hitBar = this.create(4, 28, 'gauge');
    this.hitMarker = this.create(4, 26, 'attack');

    this.hitAreas = [];
    this.hitFont = state.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.hitFont.text = '0';
    this.hitImage = this.create(1, 5, this.hitFont);
    this.hitImage.visible = false;

    this.hitTween = state.add.tween(this.hitMarker);

    this.isFighting = false;
    this.yourFightMove = false;
    this.visible = false;

    this.calculateHitAreas();

    return this;

};

TimesOfLores.FightScreen.prototype = Object.create(Phaser.Group.prototype);
TimesOfLores.FightScreen.prototype.constructor = TimesOfLores.FightScreen;

TimesOfLores.FightScreen.prototype.calculateHitAreas = function () {

    var w = this.game.cache.getImage('gauge').width;
    var h = this.game.cache.getImage('gauge').height;

    var bmd = this.game.make.bitmapData(w, h);
    bmd.draw('gauge');
    bmd.update();

    //  Right let's scan this sucker
    for (var y = 0; y < h; y += 3)
    {
        var pixels = [];

        for (var x = 1; x < (w-2); x++)
        {
            if (bmd.getPixel32(x, y) === 4285152767)
            {
                pixels.push(true);
            }
            else
            {
                pixels.push(false);
            }
        }

        this.hitAreas.push(pixels);
    }

};

TimesOfLores.FightScreen.prototype.display = function (enemyType) {

    this.state.ui.hide();

    console.log('FightScreen display', enemyType);

    switch (enemyType)
    {
        case 7:
            this.enemy = new TimesOfLores.Enemy.Frog(this, enemyType);
            break;

        case 8:
            this.enemy = new TimesOfLores.Enemy.Duck(this, enemyType);
            break;

        case 9:
            this.enemy = new TimesOfLores.Enemy.Plotop(this, enemyType);
            break;

        case 10:
            this.enemy = new TimesOfLores.Enemy.Bat(this, enemyType);
            break;

        case 11:
            this.enemy = new TimesOfLores.Enemy.Snake(this, enemyType);
            break;
    }

    console.log(this.enemy.hitArea);

    this.enemyHealthFill.visible = true;

    this.hitBar.frame = enemyType - 7;
    this.hitBar.y = -4;
    this.hitMarker.x = 32;

    this.hitImage.x = 1;
    this.hitImage.y = 5;
    this.hitImage.visible = false;

    this.state.add.tween(this.hitBar).to( { y: 28 }, 1000, Phaser.Easing.Sinusoidal.Out, true);
    var tween = this.state.add.tween(this.hitMarker).to( { x: 4 }, 1000, Phaser.Easing.Sinusoidal.Out, true);

    //  Initiative check
    var you = this.d20 + this.character.initiative;
    var them = this.d20 + this.enemy.initiative;

    console.log('You are fighting a', this.enemy.name, 'with hitpoints:', this.enemy.hitPoints, 'and', this.enemy.health, 'health');

    console.log('Initiative check. You:', you, 'Them:', them);

    if (you >= them)
    {
        tween.onComplete.add(this.yourAttack, this);
    }
    else
    {
        tween.onComplete.add(this.enemyAttacks, this);
    }

    this.visible = true;

};

TimesOfLores.FightScreen.prototype.yourAttack = function () {

    console.log('You Attack');

    this.yourFightMove = true;

    this.hitMarker.x = 4;
    this.hitImage.visible = false;

    this.hitTween = this.state.add.tween(this.hitMarker).to( { x: 25 }, 600, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

    //  bloody hard!
    // this.hitTween = this.state.add.tween(this.hitMarker).to( { x: 25 }, 1000, Phaser.Easing.Circular.InOut, true, 0, 1000, true);
    // this.hitTween = this.state.add.tween(this.hitMarker).to( { x: 25 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

};

TimesOfLores.FightScreen.prototype.hit = function () {

    if (this.yourFightMove && this.hitTween.isRunning)
    {
        var x = Math.round(this.hitMarker.x) - 4;

        console.log('Marker at', x);

        this.hitTween.stop();

        this.hitImage.x = 21;
        this.hitImage.y = 7;
        this.hitImage.visible = true;

        if (this.enemy.wasHit(x))
        {
            var dmg = this.character.damage;

            console.log('You hit the Enemy for', dmg, 'damage.');

            this.enemy.hitPoints -= dmg;

            this.hitFont.text = '-' + dmg;

            console.log('Enemy hitPoints:', this.enemy.hitPoints, ' Health:', this.enemy.health);
    
            if (this.enemy.health > 0)
            {
                var tween = this.state.add.tween(this.hitImage).to( { y: -6 }, 1000, Phaser.Easing.Sinusoidal.Out);
                tween.onComplete.add(this.enemyAttacks, this);
                tween.start();
            }
            else
            {
                this.enemyDead();
            }
        }
        else
        {
            //  You missed!
            console.log('You missed');

            this.hitFont.text = '-0';

            var tween = this.state.add.tween(this.hitImage).to( { y: -6 }, 1000, Phaser.Easing.Sinusoidal.Out);
            tween.onComplete.add(this.enemyAttacks, this);
            tween.start();
        }
    }

};

TimesOfLores.FightScreen.prototype.enemyAttacks = function () {

    console.log('Enemy Attacks');

    this.yourFightMove = false;

    this.hitImage.x = 1;
    this.hitImage.y = 7;
    this.hitImage.visible = true;

    //  Enemy attacks ...

    var amt = this.d20 + this.enemy.attackBonus;

    console.log('Enemy rolls', amt, 'vs. your armorClass of', this.character.armorClass);

    if (amt >= this.character.armorClass && !TimesOfLores.cheatInvin)
    {
        //  Enemy hit you
        var dmg = this.enemy.damage;
    
        console.log('Enemy hit you for', dmg, 'damage');

        this.hitFont.text = '-' + dmg;

        var tween = this.state.add.tween(this.hitImage).to( { y: -6 }, 1000, Phaser.Easing.Sinusoidal.Out);

        this.character.hitPoints -= dmg;

        console.log('Your hitPoints:', this.character.hitPoints, ' Health:', this.character.health);

        if (this.character.health > 0)
        {
            tween.onComplete.add(this.yourAttack, this);
            tween.start();
        }
        else
        {
            console.log('YOU ARE DEAD!');
            this.state.start('GameOver');
        }
    }
    else
    {
        console.log('Enemy missed');

        this.hitFont.text = '-0';

        var tween = this.state.add.tween(this.hitImage).to( { y: -6 }, 1000, Phaser.Easing.Sinusoidal.Out);

        tween.onComplete.add(this.yourAttack, this);
        tween.start();
    }

};


TimesOfLores.FightScreen.prototype.enemyDead = function () {

    console.log('enemy DEAD');

    //  Dead!
    //  
    //  Ok let's do something nicer here

    this.enemyHealthFill.visible = false;

    var payout = this.enemy.kill();

    this.character.gold += payout;

    this.state.ui.dropCoins(payout);

    this.walker.putTile(-1);
    this.state.map.refresh();

    console.log('payout', payout);

    this.hide();

};

TimesOfLores.FightScreen.prototype.hide = function () {

    this.state.add.tween(this.hitBar).to( { y: -4 }, 1000, Phaser.Easing.Sinusoidal.Out, true);

    var tween = this.state.add.tween(this.hitMarker).to( { x: 32 }, 1000, Phaser.Easing.Sinusoidal.Out, true);

    tween.onComplete.add(this.hideOver, this);

};

TimesOfLores.FightScreen.prototype.hideOver = function () {

    //  Show death sequence, but until then ...
    this.isFighting = false;
    this.visible = false;

    this.state.ui.show();

};

TimesOfLores.FightScreen.prototype.update = function () {

    if (this.enemy && this.enemyHealthFill.width !== this.enemy.health)
    {
        this.enemyHealthFill.width = this.enemy.health;
    }

};

Object.defineProperty(TimesOfLores.FightScreen.prototype, "d20", {

    get: function () {

        return this.game.rnd.integerInRange(1, 20);

    }

});
