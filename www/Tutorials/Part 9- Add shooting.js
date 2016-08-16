var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

// We are going to enable shooting for our hero.
// First, we have to declare two var for our bullets group and each bullet.
var starfield;
var hero;
var aliens;
var bullets;
var bullet;

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
		
		hero.enableBody=true;
		game.physics.arcade.enable(hero);
		hero.body.collideWorldBounds= true;
		hero.anchor.x=0.4;
		hero.anchor.y=-0.8;
		
		// Here, we create a pool of bullets for our use
		// Our bullets, and their characteristics.
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);
		    
		// Then, we create our auto shooting function.
		game.time.events.loop(Phaser.Timer.SECOND=400, fireAtEnemy, this);
		// Now, we have to define our fireAtEnemy function. Scroll down!
        
	
		
	},
	update: function () {
        
        starfield.tilePosition.y += 2;
       
        if (game.physics.arcade.distanceToPointer(hero, game.input.activePointer) > 4)
        {
        
            game.physics.arcade.moveToPointer(hero, 300);
        } else {
        
            hero.body.velocity.set(0);
        }

	}

};

// Here we create our function for shooting.
function fireAtEnemy () {
	// First, we create a bullet at the location of the hero.
    bullet= bullets.create(hero.x,hero.y,'pewpew');
	// Next, we move(tween) the bullet image from the location of the hero to the top of the screen, 
	// or out of the screen in our case.
	game.add.tween(bullet).to({y:-100},500,"Linear",true);
}

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');