TimesOfLores.Enemy.Bat = function (fightScreen, id) {

    this.name = 'Bat';

    this.initiative = 5;
    this.hitPoints = 21;
    this.armorClass = 22;
    this.attackBonus = 6; // added to 1d20 it attacks
    this.damageRoll = 8;
    this.damageModifier = 3;

    this.minGold = 2;
    this.maxGold = 6;

    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Bat.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Bat.prototype.constructor = TimesOfLores.Enemy.Bat;

TimesOfLores.Enemy.Bat.prototype.kill = function () {

    console.log(this.name, 'died!');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
