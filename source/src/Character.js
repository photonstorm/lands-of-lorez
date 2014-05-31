TimesOfLores.Character = function (state, type) {

    this.game = state.game;
    this.walker = state.walker;
    this.type = type;

    if (this.type === 1)
    {
        console.log('Created Character Type 1 (EASY)');
        this.baseHitPoints = 30;
        this.initiative = 10;
        this.damageRoll = 15;
        this.damageModifier = 7;
        this.markerSpeed = 1000;
    }
    else if (this.type === 2)
    {
        console.log('Created Character Type 2 (MEDIUM)');
        this.baseHitPoints = 20;
        this.initiative = 5;
        this.damageRoll = 10;
        this.damageModifier = 5;
        this.markerSpeed = 700;
    }
    else if (this.type === 3)
    {
        console.log('Created Character Type 3 (ULTRA)');
        this.baseHitPoints = 12;
        this.initiative = 5;
        this.damageRoll = 10;
        this.damageModifier = 1;
        this.markerSpeed = 600;
    }

    this.hitPoints = this.baseHitPoints;
    this.armorClass = 15;
    this.attackBonus = 5;

    this.keys = 0;
    this.gold = 0;
    this.totalGold = 0;

    this.isFighting = false;
    this.yourFightMove = false;

};

TimesOfLores.Character.prototype = {

    setFullHealth: function () {

        this.hitPoints = this.baseHitPoints;

    },

    reset: function () {

        if (this.type === 1)
        {
            this.baseHitPoints = 30;
            this.initiative = 10;
            this.damageRoll = 15;
            this.damageModifier = 7;
        }
        else if (this.type === 2)
        {
            this.baseHitPoints = 20;
            this.initiative = 5;
            this.damageRoll = 10;
            this.damageModifier = 5;
        }
        else if (this.type === 3)
        {
            this.baseHitPoints = 12;
            this.initiative = 5;
            this.damageRoll = 10;
            this.damageModifier = 1;
        }

        this.hitPoints = this.baseHitPoints;
        this.armorClass = 15;
        this.attackBonus = 5;

        this.keys = 0;
        this.gold = 0;

        this.isFighting = false;
        this.yourFightMove = false;

    }

};

Object.defineProperty(TimesOfLores.Character.prototype, "health", {

    get: function () {

        if (this.hitPoints === this.baseHitPoints)
        {
            return 10;
        }
        else
        {
            return (this.hitPoints / this.baseHitPoints) * 10;
        }

    }

});

Object.defineProperty(TimesOfLores.Character.prototype, "damage", {

    get: function () {

        return this.game.rnd.integerInRange(1, this.damageRoll) + this.damageModifier;

    }

});
