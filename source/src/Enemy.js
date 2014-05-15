TimesOfLores.Enemy = function (fightScreen, id) {

    this.game = fightScreen.game;
    this.id = id;
    this.hitArea = fightScreen.hitAreas[id - 7];

    this.health = 10;
    this.damage = 1;
    this.armor = 1;

    this.minGold = 1;
    this.maxGold = 2;

};

TimesOfLores.Enemy.prototype = {

    wasHit: function (x) {

        return this.hitArea[x];

    }

    // setFullHealth: function () {

    //     this.health = this.baseHealth;

    // }

};
