TimesOfLores.Enemy.Frog = function (fightScreen, id) {

    TimesOfLores.Enemy.call(this, fightScreen, id);

    this.health = 10;
    this.damage = 1;
    this.armor = 1;

    this.minGold = 2;
    this.maxGold = 6;

};

TimesOfLores.Enemy.Frog.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Frog.prototype.constructor = TimesOfLores.Enemy.Frog;

TimesOfLores.Enemy.Frog.prototype.kill = function () {

    console.log('a frog died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
