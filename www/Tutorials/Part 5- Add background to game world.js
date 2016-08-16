var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

//Everything should be working well at this stage.
// We will now put in our background and simulate movement flying through space
//First, we will have to declare a variable for it so that we can use it in our game.
var starfield;

var SpaceShooter = {

	preload: function () {
        game.load.audio('explosionsound','audio/explosion2.mp3');
		
		game.load.image('pewpew','img/bullet.png');
		game.load.image('stars','img/starfield.png');
		game.load.image('center', 'img/boundary.png');
		
		game.load.spritesheet('baddie','img/baddie.png',32,32);
		game.load.spritesheet('dude','img/dude.png',32,48);
		game.load.spritesheet('explode','img/explode.png',128,128);
	},
	create: function () {
        //Here, we add our background image as a tilesprite.
        starfield = game.add.tileSprite(0, 0, window.innerWidth,window.innerHeight, 'stars');
        
        game.add.sprite(10,10,'baddie');
		game.add.sprite(game.world.width-100,game.world.height-100,'dude');
		
		//if you add your background after your sprites, you won't be able to see them.
		
	},
	update: function () {
        //The starfield will move down along the y-axis by 2px every Update cycle
        starfield.tilePosition.y += 2;

	}

};

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');