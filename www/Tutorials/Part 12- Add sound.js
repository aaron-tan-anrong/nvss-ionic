var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

// Now let's create some sounds for our game. Create a var for it first!
var starfield;
var hero;
var aliens;
var bullets;
var bullet;
var explosions;
var boundary;
var explosionsound;

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
        
        boundary= game.add.sprite(0, window.innerHeight/2, 'center');
		boundary.width= window.innerWidth*3;
		boundary.enableBody= true;
		boundary.anchor.setTo(0.5);
		boundary.alpha=0; 
		this.physics.arcade.enable(boundary);
		boundary.body.immovable= true;
        
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
		
	
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);
		    
	
		game.time.events.loop(Phaser.Timer.SECOND=400, fireAtEnemy, this);
	
	   
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'explode');
		    explosions.forEach(setupAlien, this);
	   
	    // We add our explosion sound here.
		    explosionsound= game.add.audio('explosionsound');
		    explosionsound.allowMultiple= true;
	
	},
	update: function () {
        
        starfield.tilePosition.y += 2;
       
        if (game.physics.arcade.distanceToPointer(hero, game.input.activePointer) > 4)
        {
        
            game.physics.arcade.moveToPointer(hero, 300);
        } else {
        
            hero.body.velocity.set(0);
        }
        
      	game.physics.arcade.overlap(bullets,aliens,killAlien,null, this);
        
        this.physics.arcade.collide(hero, boundary);

	}

};

function fireAtEnemy () {
	
    bullet= bullets.create(hero.x,hero.y,'pewpew');
	game.add.tween(bullet).to({y:-100},500,"Linear",true);
}

function setupAlien(alien) {

    alien.anchor.x = 0.5;
    alien.anchor.y = 0.5;
    alien.animations.add('explode');

}

function killAlien (bullet,alien){

	bullet.kill();
	alien.kill();
	// We play the explosion sound here, when the alien dies.
	explosionsound.play();

    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('explode', 30, false, true);
}

game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');

// Congratulations! You've completed your first game! (: