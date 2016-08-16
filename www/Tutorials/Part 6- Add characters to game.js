var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

//Now we will add in our main character and the aliens.
//As before, we will have to declares variables for them.
var starfield;
var hero;
var aliens;

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
        
        starfield = game.add.tileSprite(0, 0, window.innerWidth,window.innerHeight, 'stars');
        
        //Let's create a group of aliens
        aliens=game.add.group();
        //Using a For-loop, we will create many aliens.
        //We are using 2 loops, one loop in another loop, aka nested loop
        //The first for-loop creates the columns, 8 means 8 columns of aliens!
        for (var w=0;w<8;w++){
            //this second for-loop creates the rows, so now we have 8 rows of 8 aliens! 
			for(var h=0;h<8;h++){
				var alien=aliens.create(w*(window.innerWidth/8)+20,h*(window.innerHeight/16)+50,'baddie');
			//Here, we will add animations for each of the aliens.
				alien.animations.add('dance',[0,1,2,3],10,true);
				alien.animations.play('dance');
			}
		}
		// Next, let's add our hero here. Make sure you have already declared a var for this!
		hero=game.add.sprite(game.world.width/2,game.world.height-100,'dude',4);
        
	
		
	},
	update: function () {
        
        starfield.tilePosition.y += 2;

	}

};

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');