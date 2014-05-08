
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

	this.mapBMD;
	this.mapImage;
	this.mapColors = [ '#000000', '#6e6e6e', '#4e3d33', '#95a8be', '#fedd00', '#64b732', '#ff3d6a' ];
	this.mapShadow = '#3e281b';

	this.walls = [];

	this.lock3;
	this.lock6;

	this.potion3;
	this.potion6;

	this.key3;
	this.key6;

	this.gold3;
	this.gold6;

	this.frog3;
	this.frog6;

	//	UI
	this.nsew;

	this.health = 10;
	this.healthFill;
	this.healthBG;

	this.level = 1;
	this.levelFont;
	this.levelImage;

	this.keys = 0;
	this.keysFont;
	this.keysImage;

	this.gold = 0;
	this.goldFont;
	this.goldImage;

	this.cursors;

};

TimesOfLores.MainMenu.prototype = {

	createSegment: function (key) {

		var obj = this.add.image(0, 0, key);
		obj.name = key;

		return obj;

	},

	create: function () {

		//	bg
		this.wall0 = this.createSegment('wall0');

    	//	far
		this.wall1 = this.createSegment('wall1');
		this.wall2 = this.createSegment('wall2');
		this.wall3 = this.createSegment('wall3');

    	//	far items
		this.lock3 = this.createSegment('lock3');
		this.potion3 = this.createSegment('potion3');
		this.key3 = this.createSegment('key3');
		this.frog3 = this.createSegment('frog3');
		this.gold3 = this.createSegment('gold3');

    	//	mid
		this.wall4 = this.createSegment('wall4');
		this.wall5 = this.createSegment('wall5');
		this.wall6 = this.createSegment('wall6');

    	//	middle items
		this.lock6 = this.createSegment('lock6');
		this.potion6 = this.createSegment('potion6');
		this.key6 = this.createSegment('key6');
		this.frog6 = this.createSegment('frog6');
		this.gold6 = this.createSegment('gold6');

    	//	near
		this.wall7 = this.createSegment('wall7');
		this.wall8 = this.createSegment('wall8');

    	//	Map
    	this.walls = [
    		[ this.wall1, this.wall3, this.wall2 ],
    		[ this.wall4, this.wall6, this.wall5 ],
    		[ this.wall7, this.wall0, this.wall8 ]
    	];

    	//	UI
    	this.healthBG = this.add.image(1, 1, 'healthBG');
    	this.healthFill = this.add.image(1, 1, 'health');
    	this.health = 10;

    	this.nsew = this.add.image(14, 0, 'nsew', 0);

	    this.levelFont = this.add.retroFont('digits', 4, 6, 'L0123456789');
	    this.levelFont.text = 'L1';
	    this.levelImage = this.add.image(24, 0, this.levelFont);

	    this.panel = this.add.image(0, 25, 'panel');

	    this.keysFont = this.add.retroFont('digits', 4, 6, 'L0123456789');
	    this.keysFont.text = '0';
	    this.keysImage = this.add.image(20, 26, this.keysFont);

	    this.goldFont = this.add.retroFont('digits', 4, 6, 'L0123456789');
	    this.goldFont.text = '0';
	    this.goldImage = this.add.image(5, 26, this.goldFont);

	    //	Minimap
	    this.mapBMD = this.make.bitmapData(32, 32);
	    this.mapImage = this.add.image(0, 0, this.mapBMD);
		this.mapImage.visible = false;


    	this.map = this.add.tilemap('map');

	    this.map.setCollisionByIndex(2);

		this.walker = new Phaser.Plugin.TilemapWalker(this.game, this.map, this.map.currentLayer, 1, 14);

		this.buildView();

		//	GamePad

		this.input.gamepad.start();

    	var leftButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
    	leftButton.onDown.add(this.turnLeft, this);

    	var rightButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
    	rightButton.onDown.add(this.turnRight, this);

    	var upButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_UP);
    	upButton.onDown.add(this.moveForward, this);

    	var downButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);
    	downButton.onDown.add(this.moveBackward, this);

    	var stepLeftButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
    	stepLeftButton.onDown.add(this.stepLeft, this);

    	var stepRightButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
    	stepRightButton.onDown.add(this.stepRight, this);

    	var xButton = this.input.gamepad.pad1.addButton(Phaser.Gamepad.XBOX360_X);
    	xButton.onDown.add(this.showMap, this);

    	this.cursors = game.input.keyboard.createCursorKeys();

    	this.cursors.up.onDown.add(this.moveForward, this);
    	this.cursors.down.onDown.add(this.showMap, this);
    	this.cursors.left.onDown.add(this.turnLeft, this);
    	this.cursors.right.onDown.add(this.turnRight, this);

	},

	checkCurrentTile: function () {

		var tile = this.walker.getTile();

		console.log('current tile is', tile);

		if (tile)
		{
			if (tile.index === 3)
			{
				//	Was locked, but now walked through it
				this.walker.putTile(-1);
			}
			else if (tile.index === 4)
			{
				//	Key
				this.keys++;
				this.walker.putTile(-1);
			}
			else if (tile.index === 8)
			{
				//	Gold
				this.gold++;
				this.walker.putTile(-1);
			}
		}

	},

	canPass: function (direction) {

		if (direction === 0)
		{
			if (this.walker.getTileAhead().index === 3)
			{
				if (this.keys > 0)
				{
					this.keys--;
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else if (direction === 1)
		{
			if (this.walker.getTileLeft().index === 3)
			{
				if (this.keys > 0)
				{
					this.keys--;
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else if (direction === 2)
		{
			if (this.walker.getTileBehind().index === 3)
			{
				if (this.keys > 0)
				{
					this.keys--;
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else if (direction === 3)
		{
			if (this.walker.getTileRight().index === 3)
			{
				if (this.keys > 0)
				{
					this.keys--;
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		
		return true;

	},

	moveForward: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		if (this.canPass(0))
		{
			if (this.walker.moveForward())
			{
				console.log('\nmoveForward');

				this.buildView();
				this.checkCurrentTile();
			}
		}

	},

	moveBackward: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		if (this.canPass(2))
		{
			if (this.walker.moveBackward())
			{
				console.log('\nmoveBackward');

				this.buildView();
				this.checkCurrentTile();
			}
		}

	},

	stepLeft: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		if (this.canPass(1))
		{
			if (this.walker.moveLeft())
			{
				console.log('\nstepLeft');

				this.buildView();
				this.checkCurrentTile();
			}
		}

	},

	stepRight: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		if (this.canPass(3))
		{
			if (this.walker.moveRight())
			{
				console.log('\nstepRight');

				this.buildView();
				this.checkCurrentTile();
			}
		}

	},

	turnLeft: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		this.walker.turnLeft();

		console.log('\nturnLeft');

		this.buildView();

	},

	turnRight: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		this.walker.turnRight();

		console.log('\nturnRight');

		this.buildView();

	},

	showWall: function (wall) {

		wall.visible = true;

		if (wall.key !== 'wall3' && wall.key !== 'wall6')
		{
			if (wall.frame === 0)
			{
				wall.frame = 1;
			}
			else
			{
				wall.frame = 0;
			}
		}

	},

	hideWalls: function () {

		for (var i = 0; i < 9; i++)
		{
			this['wall' + i].visible = false;
		}

		this.lock3.visible = false;
		this.lock6.visible = false;

	},

	hideItems: function () {

		this.key3.visible = false;
		this.key6.visible = false;

		this.potion3.visible = false;
		this.potion6.visible = false;

		this.frog3.visible = false;
		this.frog6.visible = false;

		this.gold3.visible = false;
		this.gold6.visible = false;

	},

	buildView: function () {

		console.log('X:', this.walker.location.x, 'Y:', this.walker.location.y, '\n');

		this.hideWalls();
		this.hideItems();

		this.showWall(this.wall0);

		this.nsew.frame = this.walker.facing;

		var tiles = this.walker.getTiles(3, 3);
		var i = 0;

		for (y = 0; y < 3; y++)
		{
			for (x = 0; x < 3; x++)
			{
				i = tiles[y][x];

				if (i === 2)
				{
					this.showWall(this.walls[y][x]);
				}
				else if (i === 3)
				{
					if (x === 1 && y === 0)
					{
						this.lock3.visible = true;
					}
					else if (x === 1 && y === 1)
					{
						this.lock6.visible = true;
					}
					else
					{
						this.showWall(this.walls[y][x]);
					}
				}
				else if (i === 4)
				{
					if (x === 1 && y === 0)
					{
						this.key3.visible = true;
					}
					else if (x === 1 && y === 1)
					{
						this.key6.visible = true;
					}
				}
				else if (i === 5)
				{
					if (x === 1 && y === 0)
					{
						this.potion3.visible = true;
					}
					else if (x === 1 && y === 1)
					{
						this.potion6.visible = true;
					}
				}
				else if (i === 6)
				{
					if (x === 1 && y === 0)
					{
						this.frog3.visible = true;
					}
					else if (x === 1 && y === 1)
					{
						this.frog6.visible = true;
					}
				}
				else if (i === 8)
				{
					if (x === 1 && y === 0)
					{
						this.gold3.visible = true;
					}
					else if (x === 1 && y === 1)
					{
						this.gold6.visible = true;
					}
				}
			}
		}

	},

	showMap: function () {

		if (this.mapImage.visible)
		{
			this.hideMap();
			return;
		}

		this.buildMap();

		this.mapImage.visible = true;

	},

	hideMap: function () {

		this.mapImage.visible = false;

	},

	buildMap: function () {

		this.mapBMD.fill(110, 110, 110, 1);

		var data = this.walker.getMiniMap(16, 16);
		var i = 0;
		var dx = 0;
		var dy = 0;

		//	Paint down the walls
		for (y = 0; y < 16; y++)
		{
			for (x = 0; x < 16; x++)
			{
				i = data.tiles[y][x];

				if (i >= 0 && i <= 2)
				{
					this.mapBMD.rect(dx, dy, 2, 2, this.mapColors[i]);
				}

				dx += 2;
			}

			dx = 0;
			dy += 2;
		}

		dx = 0;
		dy = 0;

		//	Then the objects
		for (y = 0; y < 16; y++)
		{
			for (x = 0; x < 16; x++)
			{
				i = data.tiles[y][x];

				if (i > 2 && i < 7)
				{
					this.mapBMD.rect(dx, dy, 2, 3, this.mapShadow);
					this.mapBMD.rect(dx, dy, 2, 2, this.mapColors[i]);
				}

				dx += 2;
			}

			dx = 0;
			dy += 2;
		}

		//	Finally the player
		this.mapBMD.rect(data.walker.x * 2, data.walker.y * 2, 2, 3, this.mapShadow);
		this.mapBMD.rect(data.walker.x * 2, data.walker.y * 2, 2, 2, '#ffffff');

	},

	update: function () {

	    this.keysFont.text = this.keys.toString();
	    this.goldFont.text = this.gold.toString();

	},

	render: function () {

		TimesOfLores.pixelContext.drawImage(game.canvas, 0, 0, 32, 32, 0, 0, TimesOfLores.width, TimesOfLores.height);

	}

};
