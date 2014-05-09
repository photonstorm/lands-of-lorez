
TimesOfLores.FightScreen = function (state) {

    Phaser.Group.call(this, state.game);

    this.state = state;
    this.walker = state.walker;
    this.character = state.character;

    this.enemyHealth = 10;
    this.enemyHealthBG = this.create(21, 1, 'enemyBG');
    this.enemyHealthFill = this.create(21, 1, 'enemy');

    this.hitBar = this.create(4, 28, 'gauge');
    this.hitMarker = this.create(4, 26, 'attack');

    this.hitFont = state.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.hitFont.text = '0';
    this.hitImage = this.create(1, 5, this.hitFont);
    this.hitImage.visible = false;

    this.hitTween = state.add.tween(this.hitMarker);

    //  Let's add a coin emitter :)
    

    this.isFighting = false;
    this.yourFightMove = false;
    this.visible = false;

    return this;

};

TimesOfLores.FightScreen.prototype = Object.create(Phaser.Group.prototype);
TimesOfLores.FightScreen.prototype.constructor = TimesOfLores.FightScreen;

TimesOfLores.FightScreen.prototype.display = function (health) {

    this.state.ui.hide();

    this.enemyHealth = health;
    this.enemyHealthFill.visible = true;

    this.hitBar.y = -4;
    this.hitMarker.x = 32;

    this.state.add.tween(this.hitBar).to( { y: 28 }, 1000, Phaser.Easing.Sinusoidal.Out, true);
    var tween = this.state.add.tween(this.hitMarker).to( { x: 4 }, 1000, Phaser.Easing.Sinusoidal.Out, true);

    //  Do you always start? maybe the enemy should sometimes. 50/50 roll maybe?
    tween.onComplete.add(this.yourAttack, this);

    this.visible = true;

};

TimesOfLores.FightScreen.prototype.yourAttack = function () {

    console.log('yourAttack');

    this.yourFightMove = true;

    this.hitMarker.x = 4;
    this.hitImage.visible = false;

    this.hitTween = this.state.add.tween(this.hitMarker).to( { x: 25 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

    //  bloody hard!
    // this.hitTween = this.state.add.tween(this.hitMarker).to( { x: 25 }, 1000, Phaser.Easing.Circular.InOut, true, 0, 1000, true);
    // this.hitTween = this.state.add.tween(this.hitMarker).to( { x: 25 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

};

TimesOfLores.FightScreen.prototype.hit = function () {

    if (this.yourFightMove && this.hitTween.isRunning)
    {
        var x = Math.floor(this.hitMarker.x);

        console.log('You hit. Marker at', x);

        this.hitTween.stop();

        this.hitImage.x = 21;
        this.hitImage.y = 7;
        this.hitImage.visible = true;

        if (x >= 11 && x <= 17)
        {
            var dmg = this.game.rnd.integerInRange(this.character.damage, this.character.damage + 2);

            this.enemyHealth -= dmg;

            this.hitFont.text = '-' + dmg;

            console.log('BOOM!', dmg, 'damage, enemy at', this.enemyHealth);
    
            if (this.enemyHealth > 0)
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

TimesOfLores.FightScreen.prototype.enemyDead = function () {

    console.log('enemy DEAD');

    //  Dead!
    //  
    //  Ok let's do something nicer here

    this.enemyHealthFill.visible = false;

    //  UI effect needed here
    this.character.gold += this.game.rnd.integerInRange(1, 5);

    this.walker.putTile(-1);
    this.state.map.refresh();

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

TimesOfLores.FightScreen.prototype.enemyAttacks = function () {

    console.log('enemyAttacks');

    this.yourFightMove = false;

    this.hitImage.x = 1;
    this.hitImage.y = 7;
    this.hitImage.visible = true;

    //  Should be set by the enemy class (strength, etc)
    var amt = this.game.rnd.integerInRange(0, 2);

    this.hitFont.text = '-' + amt;

    var tween = this.state.add.tween(this.hitImage).to( { y: -6 }, 1000, Phaser.Easing.Sinusoidal.Out);

    if (amt > 0)
    {
        this.character.health -= amt;

        console.log('enemy hit you for', amt, 'health', this.character.health);

        if (this.character.health > 0)
        {
            tween.onComplete.add(this.yourAttack, this);
            tween.start();
        }
        else
        {
            console.log('YOU ARE DEAD!');
        }
    }
    else
    {
        tween.onComplete.add(this.yourAttack, this);
        tween.start();
    }

};

TimesOfLores.FightScreen.prototype.update = function () {

    if (this.enemyHealthFill.width !== this.enemyHealth)
    {
        this.enemyHealthFill.width = this.enemyHealth;
    }

};
