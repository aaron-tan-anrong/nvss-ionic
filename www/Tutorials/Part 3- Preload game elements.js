var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');


var SpaceShooter = {

	preload: function () {
		//here we are preloading the images we will be using for our game
		//we give each of them a name, as well as indicate where the image can be found in the filesystyem
		game.load.audio('explosionsound','audio/explosion2.mp3');
		
		game.load.image('pewpew','img/bullet.png');
		game.load.image('stars','img/starfield.png');
		game.load.image('center', 'img/boundary.png');
		
		game.load.spritesheet('baddie','img/baddie.png',32,32);
		game.load.spritesheet('dude','img/dude.png',32,48);
		game.load.spritesheet('explode','img/explode.png',128,128);
	},
	create: function () {

		
	},
	update: function () {


	}

};

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');