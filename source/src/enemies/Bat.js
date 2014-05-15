TimesOfLores.Enemy.Bat = function (game) {

    TimesOfLores.Enemy.call(this, game);

    this.health = 10;
    this.damage = 1;
    this.armor = 1;

    this.minGold = 2;
    this.maxGold = 6;

};

TimesOfLores.Enemy.Bat.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Bat.prototype.constructor = TimesOfLores.Enemy.Bat;

TimesOfLores.Enemy.Bat.prototype.kill = function () {

    console.log('A Bat died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
