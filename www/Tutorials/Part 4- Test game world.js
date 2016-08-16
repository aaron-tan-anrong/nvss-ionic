var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');


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
        //let's see if our sprites appear on our game world!
		game.add.sprite(10,10,'baddie');
		game.add.sprite(game.world.width-100,game.world.height-100,'dude');
		
	},
	update: function () {


	}

};

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');