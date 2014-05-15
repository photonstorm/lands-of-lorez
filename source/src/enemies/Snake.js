TimesOfLores.Enemy.Snake = function (fightScreen, id) {

    TimesOfLores.Enemy.call(this, fightScreen, id);

    this.health = 10;
    this.damage = 1;
    this.armor = 1;

    this.minGold = 2;
    this.maxGold = 6;

};

TimesOfLores.Enemy.Snake.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Snake.prototype.constructor = TimesOfLores.Enemy.Snake;

TimesOfLores.Enemy.Snake.prototype.kill = function () {

    console.log('A Snake died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
