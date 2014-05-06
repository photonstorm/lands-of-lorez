
TimesOfLores.MainMenu = function (game) {

	this.music = null;
	this.map = null;

	this.walker;

	this.wall0;
	this.wall1;
	this.wall2;
	this.wall3;
	this.wall4;
	this.wall5;
	this.wall6;
	this.wall7;
	this.wall8;

	this.lock3;
	this.lock6;

	this.potion3;
	this.potion6;

	this.key3;
	this.key6;

	this.frog3;
	this.frog6;

	this.cursors;

};

TimesOfLores.MainMenu.prototype = {

	create: function () {

		//	bg
    	this.wall0 = this.add.image(0, 0, 'wall0');

    	//	far
    	this.wall1 = this.add.image(0, 0, 'wall1');
    	this.wall2 = this.add.image(0, 0, 'wall2');
    	this.wall3 = this.add.image(0, 0, 'wall3');

    	//	far middle items
    	this.lock3 = this.add.image(0, 0, 'lock3');
    	this.potion3 = this.add.image(0, 0, 'potion3');
    	this.key3 = this.add.image(0, 0, 'key3');
    	this.frog3 = this.add.image(0, 0, 'frog3');

    	//	mid
    	this.wall4 = this.add.image(0, 0, 'wall4');
    	this.wall5 = this.add.image(0, 0, 'wall5');
    	this.wall6 = this.add.image(0, 0, 'wall6');

    	//	middle items
    	this.lock6 = this.add.image(0, 0, 'lock6');
    	this.potion6 = this.add.image(0, 0, 'potion6');
    	this.key6 = this.add.image(0, 0, 'key6');
    	this.frog6 = this.add.image(0, 0, 'frog6');

    	//	near
    	this.wall7 = this.add.image(0, 0, 'wall7');
    	this.wall8 = this.add.image(0, 0, 'wall8');

    	this.map = this.add.tilemap('map');

	    this.map.setCollisionByIndex(2);

		this.walker = new Phaser.Plugin.TilemapWalker(this.game, this.map, this.map.currentLayer, 1, 14);

		this.buildView();

    	this.cursors = game.input.keyboard.createCursorKeys();

    	this.cursors.up.onDown.add(this.moveForward, this);
    	this.cursors.down.onDown.add(this.moveBackward, this);

	},

	moveForward: function () {

		this.walker.moveForward();
		this.buildView();

	},

	moveBackward: function () {

		this.walker.moveBackward();
		this.buildView();

	},

	buildView: function () {

		this.wall1.visible = false;
		this.wall2.visible = false;
		this.wall3.visible = false;
		this.wall4.visible = false;
		this.wall5.visible = false;
		this.wall6.visible = false;
		this.wall7.visible = false;
		this.wall8.visible = false;

		this.lock3.visible = false;
		this.lock6.visible = false;

		this.key3.visible = false;
		this.key6.visible = false;

		this.potion3.visible = false;
		this.potion6.visible = false;

		this.frog3.visible = false;
		this.frog6.visible = false;

		var tiles = this.walker.getTiles(3, 3);

		var i = 0;
		var s = '';

		for (y = 0; y < 3; y++)
		{
			for (x = 0; x < 3; x++)
			{
				if (tiles[i])
				{
					s = s + tiles[i].index;
				}
				else
				{
					s = s + ' ';
				}
				i++;
			}
			
			console.log(s);
			s = '';
		}

		//	far

		if (tiles[0] && tiles[0].index === 2)
		{
			this.wall1.visible = true;
		}

		if (tiles[1])
		{
			if (tiles[1].index === 2)
			{
				this.wall3.visible = true;
			}
			else if (tiles[1].index === 3)
			{
				this.lock3.visible = true;
			}
			else if (tiles[1].index === 4)
			{
				this.key3.visible = true;
			}
			else if (tiles[1].index === 5)
			{
				this.potion3.visible = true;
			}
			else if (tiles[1].index === 6)
			{
				this.frog3.visible = true;
			}
		}

		if (tiles[2] && tiles[2].index === 2)
		{
			this.wall4.visible = true;
		}

		//	mid

		if (tiles[3] && tiles[3].index === 2)
		{
			this.wall4.visible = true;
		}

		if (tiles[4])
		{
			if (tiles[4].index === 2)
			{
				this.wall6.visible = true;
			}
			else if (tiles[4].index === 3)
			{
				this.lock6.visible = true;
			}
			else if (tiles[4].index === 4)
			{
				this.key6.visible = true;
			}
			else if (tiles[4].index === 5)
			{
				this.potion6.visible = true;
			}
			else if (tiles[4].index === 6)
			{
				this.frog6.visible = true;
			}
		}

		if (tiles[5] && tiles[5].index === 2)
		{
			this.wall5.visible = true;
		}

		//	near

		if (tiles[6] && tiles[6].index === 2)
		{
			this.wall7.visible = true;
		}

		if (tiles[8] && tiles[8].index === 2)
		{
			this.wall8.visible = true;
		}

	},

	update: function () {

	},

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
