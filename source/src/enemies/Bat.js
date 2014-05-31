TimesOfLores.Enemy.Bat = function (fightScreen, id) {

    this.name = 'Bat';

    this.initiative = 10;
    this.hitPoints = 10;
    this.attackBonus = 10; // added to 1d20 it attacks
    this.damageRoll = 3;
    this.damageModifier = 0;

    this.minGold = 1;
    this.maxGold = 2;

    this.armorClass = 22;
	
    TimesOfLores.Enemy.call(this, fightScreen, id);

};

TimesOfLores.Enemy.Bat.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Bat.prototype.constructor = TimesOfLores.Enemy.Bat;

TimesOfLores.Enemy.Bat.prototype.kill = function () {

    console.log(this.name, 'died!');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
