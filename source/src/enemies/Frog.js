TimesOfLores.Enemy.Frog = function (fightScreen, id) {

    this.name = 'Frog';

    this.initiative = 0;
    this.hitPoints = 15;
    this.attackBonus = 5; // added to 1d20 it attacks
    this.damageRoll = 5;
    this.damageModifier = 0;

    this.minGold = 1;
    this.maxGold = 1;

    this.armorClass = 12;
	
    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Frog.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Frog.prototype.constructor = TimesOfLores.Enemy.Frog;

TimesOfLores.Enemy.Frog.prototype.kill = function () {

    console.log(this.name, 'died!');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
