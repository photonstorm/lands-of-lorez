TimesOfLores.Enemy.Frog = function (fightScreen, id) {

    this.name = 'Frog';

    this.initiative = 6;
    this.hitPoints = 12;
    this.armorClass = 12;
    this.attackBonus = 4; // added to 1d20 it attacks
    this.damageRoll = 6;
    this.damageModifier = 4;

    this.minGold = 2;
    this.maxGold = 6;

    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Frog.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Frog.prototype.constructor = TimesOfLores.Enemy.Frog;

TimesOfLores.Enemy.Frog.prototype.kill = function () {

    console.log(this.name, 'died!');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
