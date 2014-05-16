TimesOfLores.Enemy.Duck = function (fightScreen, id) {

    this.name = 'Duck';

    this.initiative = 2;
    this.hitPoints = 37;
    this.armorClass = 14;
    this.attackBonus = 2; // added to 1d20 it attacks
    this.damageRoll = 6;
    this.damageModifier = 1;

    this.minGold = 2;
    this.maxGold = 6;

    TimesOfLores.Enemy.call(this, fightScreen, id);

}

TimesOfLores.Enemy.Duck.prototype = Object.create(TimesOfLores.Enemy.prototype);
TimesOfLores.Enemy.Duck.prototype.constructor = TimesOfLores.Enemy.Duck;

TimesOfLores.Enemy.Duck.prototype.kill = function () {

    console.log(this.name, 'died!');

    return this.game.rnd.integerInRange(this.minGold, this.maxGold);

};
