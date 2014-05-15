TimesOfLores.Enemy.Plotop = function (game) {

    TimesOfLores.Enemy.call(this, game);

    this.health = 10;
    this.damage = 1;
    this.armor = 1;

    this.minGold = 2;
    this.maxGold = 6;

};

TimesOfLores.Enemy.Plotop.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Plotop.prototype.constructor = TimesOfLores.Enemy.Plotop;

TimesOfLores.Enemy.Plotop.prototype.kill = function () {

    console.log('A Plotop died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
