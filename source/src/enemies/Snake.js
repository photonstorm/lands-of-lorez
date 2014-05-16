TimesOfLores.Enemy.Snake = function (fightScreen, id) {

    this.name = 'Snake';

    this.initiative = 5;
    this.hitPoints = 17;
    this.armorClass = 21;
    this.attackBonus = 7; // added to 1d20 it attacks
    this.damageRoll = 8;
    this.damageModifier = 3;

    this.minGold = 2;
    this.maxGold = 6;

    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Snake.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Snake.prototype.constructor = TimesOfLores.Enemy.Snake;

TimesOfLores.Enemy.Snake.prototype.kill = function () {

    console.log('A Snake died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
