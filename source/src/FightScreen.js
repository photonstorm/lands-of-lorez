
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

    this.visible = true;

    //  Do you always start? maybe the enemy should sometimes. 50/50 roll maybe?
    this.yourAttack();

};

TimesOfLores.FightScreen.prototype.yourAttack = function () {

    console.log('yourAttack');

    this.yourFightMove = true;

    this.hitMarker.x = 4;

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
            this.enemyHealth -= this.character.damage;

            this.hitFont.text = '-' + this.character.damage;

            console.log('BOOM!', this.character.damage, 'damage, enemy at', this.enemyHealth);
    
            if (this.enemyHealth > 0)
            {
                var tween = this.state.add.tween(this.hitImage).to( { y: -6 }, 1000, Phaser.Easing.Sinusoidal.Out);
                tween.onComplete.add(this.enemyAttacks, this);
                tween.start();
            }
            else
            {
                console.log('enemy DEAD');

                //  Dead!
                this.enemyHealthFill.visible = false;

                //  UI effect needed here
                this.character.gold += this.game.rnd.integerInRange(1, 5);
                this.walker.putTile(-1);
                this.state.map.refresh();

                //  Show death sequence, but until then ...
                this.isFighting = false;
                this.visible = false;

                this.state.ui.show();
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
