
TimesOfLores.UI = function (state) {

    Phaser.Group.call(this, state.game);

    this.state = state;
    this.walker = state.walker;
    this.character = state.character;

    this.keyFx = this.create(0, 0, 'itemsPickUp', 1);
    this.potionFx = this.create(0, 0, 'itemsPickUp', 2);

    this.bloodSplat = this.create(0, 0, 'itemsPickUp', 0);
    this.bloodSplat.anchor.set(0.5);
    this.bloodSplat.visible = false;

    this.openDoor = this.create(0, 0, 'itemsPickUp', 11);
    this.openDoor.visible = false;

    this.emitter = state.make.emitter(8, 0, 50);
    this.emitter.width = 20;
    this.emitter.makeParticles('coin');
    this.emitter.minParticleSpeed.set(0, 20);
    this.emitter.maxParticleSpeed.set(0, 30);
    this.emitter.setRotation(0, 0);

    this.add(this.emitter);

    this.healthBG = this.create(1, 1, 'healthBG');
    this.healthFill = this.create(1, 1, 'health');

    this.nsew = this.create(14, 0, 'nsew', 0);

    this.levelFont = game.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.levelFont.text = 'L1';
    this.levelImage = this.create(24, 0, this.levelFont);

    this.panel = this.create(0, 25, 'panel');

    this.keysFont = game.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.keysFont.text = '0';
    this.keysImage = this.create(20, 26, this.keysFont);

    this.goldFont = game.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.goldFont.text = '0';
    this.goldImage = this.create(5, 26, this.goldFont);

    this.keyFx.visible = false;
    this.potionFx.visible = false;

    this.intro1 = this.create(0, 0, 'intro1');
    this.intro2 = this.create(0, 0, 'intro2');

    this.intro1.visible = false;
    this.intro2.visible = false;

    return this;

};

TimesOfLores.UI.prototype = Object.create(Phaser.Group.prototype);
TimesOfLores.UI.prototype.constructor = TimesOfLores.UI;

TimesOfLores.UI.prototype.showIntro1 = function () {

    this.intro1.y = 32;
    this.intro1.visible = true;

    this.state.add.tween(this.intro1).to( { y: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);

};

TimesOfLores.UI.prototype.hideIntro1 = function () {

    var tween = this.state.add.tween(this.intro1).to( { y: -32 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    tween.onComplete.add(function() { this.intro1.visible = false; }, this);

};

TimesOfLores.UI.prototype.showIntro2 = function () {

    this.intro2.y = 32;
    this.intro2.visible = true;

    this.state.add.tween(this.intro2).to( { y: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);

};

TimesOfLores.UI.prototype.hideIntro2 = function () {

    var tween = this.state.add.tween(this.intro2).to( { y: -32 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    tween.onComplete.add(function() { this.intro2.visible = false; }, this);

};

TimesOfLores.UI.prototype.update = function () {

    this.nsew.frame = this.walker.facing;

    this.keysFont.text = this.character.keys.toString();
    this.goldFont.text = this.character.gold.toString();

    if (this.healthFill.width !== this.character.health)
    {
        this.healthFill.width = this.character.health;
    }

    this.emitter.update();

};

TimesOfLores.UI.prototype.dropCoins = function (payout) {

    this.emitter.visible = true;

    this.emitter.start(false, 2000, 250, payout);

};

TimesOfLores.UI.prototype.show = function () {

    this.setAll('visible', true);

    this.keyFx.visible = false;
    this.potionFx.visible = false;
    this.bloodSplat.visible = false;
    this.openDoor.visible = false;
    this.intro1.visible = false;
    this.intro2.visible = false;

};

TimesOfLores.UI.prototype.hide = function () {

    //  Hide everything other than your health bar
    this.setAll('visible', false);

    this.healthBG.visible = true;
    this.healthFill.visible = true;

};

TimesOfLores.UI.prototype.pickUpKey = function () {

    this.keyFx.x = 0;
    this.keyFx.y = 0;
    this.keyFx.visible = true;

    this.walker.putTile(-1);
    this.state.map.refresh();

    //  play sound

    var tween = this.game.add.tween(this.keyFx).to( { y: -32 }, 700, Phaser.Easing.Quartic.In, true);
    tween.onComplete.add(this.gotKey, this);

};

TimesOfLores.UI.prototype.gotKey = function () {

    this.character.keys++;
    this.keyFx.visible = false;

};

TimesOfLores.UI.prototype.splatterHouse = function (dead) {

    this.bloodSplat.x = 16;
    this.bloodSplat.y = 8;
    this.bloodSplat.scale.set(0);
    this.bloodSplat.alpha = 1;
    this.bloodSplat.visible = true;

    //  play sound

    var drip = 900;

    if (dead)
    {
        drip = 2000;
    }

    var tween = this.game.add.tween(this.bloodSplat.scale).to( { x: 1, y: 1 }, 300, Phaser.Easing.Quartic.In);
    var tween2 = this.game.add.tween(this.bloodSplat).to( { y: 64, alpha: 0.3 }, drip, Phaser.Easing.Quartic.In);

    tween.chain(tween2);

    tween2.onComplete.add(this.endBlood, this);

    tween.start();

};

TimesOfLores.UI.prototype.endBlood = function () {

    this.bloodSplat.visible = false;

};

TimesOfLores.UI.prototype.pickUpPotion = function () {

    this.potionFx.x = 0;
    this.potionFx.y = 0;
    this.potionFx.visible = true;

    this.walker.putTile(-1);
    this.state.map.refresh();

    //  play sound

    this.game.add.tween(this.healthFill).to( { width: 10 }, 700, Phaser.Easing.Quartic.In, true);

    var tween = this.game.add.tween(this.potionFx).to( { y: -32 }, 700, Phaser.Easing.Quartic.In, true);
    tween.onComplete.add(this.gotPotion, this);

};

TimesOfLores.UI.prototype.gotPotion = function () {

    this.character.setFullHealth();
    this.potionFx.visible = false;

};
