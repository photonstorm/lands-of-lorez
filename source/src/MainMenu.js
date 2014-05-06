
TimesOfLores.MainMenu = function (game) {

	this.music = null;

};

TimesOfLores.MainMenu.prototype = {

	create: function () {

    	this.add.image(0, 0, 'wall0');
    	this.add.image(0, 0, 'wall1');
    	this.add.image(0, 0, 'wall2');

	},

	update: function () {

	}

};
