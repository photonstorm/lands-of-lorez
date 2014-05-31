TimesOfLores.Enemy.Plotop = function (fightScreen, id) {

    this.name = 'Plotop';

    this.initiative = 5;
    this.hitPoints = 18;
    this.attackBonus = 6; // added to 1d20 it attacks
    this.damageRoll = 5;
    this.damageModifier = 1;

    this.minGold = 1;
    this.maxGold = 4;

    this.armorClass = 16;
	
    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Plotop.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Plotop.prototype.constructor = TimesOfLores.Enemy.Plotop;

TimesOfLores.Enemy.Plotop.prototype.kill = function () {

    console.log('A Plotop died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
