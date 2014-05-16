TimesOfLores.Enemy = function (fightScreen, id) {

    this.game = fightScreen.game;

    this.id = id;

    this.hitArea = fightScreen.hitAreas[id - 7];

    this.baseHitPoints = this.hitPoints;

};

TimesOfLores.Enemy.prototype = {

    wasHit: function (x) {

        return this.hitArea[x];

    }

};

Object.defineProperty(TimesOfLores.Enemy.prototype, "health", {

    get: function () {

        if (this.hitPoints === this.baseHitPoints)
        {
            return 10;
        }
        else
        {
            return Math.round((this.hitPoints / this.baseHitPoints) * 10);
        }

    }

});

Object.defineProperty(TimesOfLores.Enemy.prototype, "damage", {

    get: function () {

        return this.game.rnd.integerInRange(1, this.damageRoll) + this.damageModifier;

    }

});
