TimesOfLores.Character = function (state, health, damage, armor) {

    //  Will be populated from Character Selection screen

    this.game = state.game;
    this.walker = state.walker;

    this.baseHealth = health;

    this.damage = damage;
    this.health = health;
    this.armor = armor;

    this.keys = 0;
    this.gold = 0;

    this.isFighting = false;
    this.yourFightMove = false;

}

TimesOfLores.Character.prototype = {

    setFullHealth: function () {

        this.health = this.baseHealth;

    }

}
