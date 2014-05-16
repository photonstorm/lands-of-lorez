TimesOfLores.Enemy.Plotop = function (fightScreen, id) {

    this.name = 'Plotop';

    this.initiative = 6;
    this.hitPoints = 42;
    this.armorClass = 16;
    this.attackBonus = 7; // added to 1d20 it attacks
    this.damageRoll = 6;
    this.damageModifier = 2;

    this.minGold = 2;
    this.maxGold = 6;

    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Plotop.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Plotop.prototype.constructor = TimesOfLores.Enemy.Plotop;

TimesOfLores.Enemy.Plotop.prototype.kill = function () {

    console.log('A Plotop died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
