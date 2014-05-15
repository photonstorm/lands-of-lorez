TimesOfLores.Enemy.Duck = function (fightScreen, id) {

    TimesOfLores.Enemy.call(this, fightScreen, id);

    this.health = 10;
    this.damage = 1;
    this.armor = 1;

    this.minGold = 2;
    this.maxGold = 6;

}

TimesOfLores.Enemy.Duck.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Duck.prototype.constructor = TimesOfLores.Enemy.Duck;

TimesOfLores.Enemy.Duck.prototype.kill = function () {

    console.log('A Duck died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
