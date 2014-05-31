TimesOfLores.Enemy.Snake = function (fightScreen, id) {

    this.name = 'Snake';

    this.initiative = 0;
    this.hitPoints = 30;
    this.attackBonus = 5; // added to 1d20 it attacks
    this.damageRoll = 6;
    this.damageModifier = 2;

    this.minGold = 1;
    this.maxGold = 5;

    this.armorClass = 21;
	
    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Snake.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Snake.prototype.constructor = TimesOfLores.Enemy.Snake;

TimesOfLores.Enemy.Snake.prototype.kill = function () {

    console.log('A Snake died');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
