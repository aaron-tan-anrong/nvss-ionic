var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

// We are going to add a drag-type control for our hero, which will be in the Update function.

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
        
        aliens=game.add.group();
        //We have to add physics for our aliens.
        aliens.enableBody=true;
		aliens.physicsBodyType = Phaser.Physics.ARCADE;
		
        for (var w=0;w<8;w++){
			for(var h=0;h<8;h++){
				var alien=aliens.create(w*(window.innerWidth/8)+20,h*(window.innerHeight/16)+50,'baddie');
				alien.animations.add('dance',[0,1,2,3],10,true);
				alien.animations.play('dance');
			}
		}
	
		hero=game.add.sprite(game.world.width/2,game.world.height-100,'dude',4);
		//We also have to add physics and some characteristics for our hero here.
		hero.enableBody=true;
		game.physics.arcade.enable(hero);
		hero.body.collideWorldBounds= true;
		hero.anchor.x=0.4;
		hero.anchor.y=-0.8;
        
	
		
	},
	update: function () {
        
        starfield.tilePosition.y += 2;
        
        //  If hero is > 4px away from your finger then let's move hero to your finger
        // effectively creating a drag-control
        if (game.physics.arcade.distanceToPointer(hero, game.input.activePointer) > 4)
        {
        //  Make hero move to your finger.
            game.physics.arcade.moveToPointer(hero, 300);
        } else {
        //  Otherwise stop moving because we're close enough to your finger
            hero.body.velocity.set(0);
        }

	}

};

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');