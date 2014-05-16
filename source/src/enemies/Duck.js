TimesOfLores.Enemy.Duck = function (fightScreen, id) {

    this.name = 'Duck';

    this.initiative = 5;
    this.hitPoints = 20;
    this.attackBonus = 5; // added to 1d20 it attacks
    this.damageRoll = 5;
    this.damageModifier = 2;

    this.minGold = 3;
    this.maxGold = 3;

    this.armorClass = 15;
	
    TimesOfLores.Enemy.call(this, fightScreen, id);

}

TimesOfLores.Enemy.Duck.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Duck.prototype.constructor = TimesOfLores.Enemy.Duck;

TimesOfLores.Enemy.Duck.prototype.kill = function () {

    console.log(this.name, 'died!');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
