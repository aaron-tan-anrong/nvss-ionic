var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

var starfield;
var boundary;
var hero;
var aliens;
var cursors;
var bullets;
var leftKey,rightKey;
var bullet;
var explode;
var shot;
var explosionsound;
var explosions;



var SpaceShooter = {

	preload: function () {
	    //game.load.audio('shot','audio/SHOOT007.mp3');
	    game.load.audio('explosionsound','audio/explosion2.mp3');
		
		game.load.image('pewpew','img/bullet.png');
		game.load.image('stars','img/starfield.png');
		game.load.image('center', 'img/boundary.png');
		
		game.load.spritesheet('baddie','img/baddie.png',32,32);
		game.load.spritesheet('dude','img/dude.png',32,48);
		game.load.spritesheet('explode','img/explode.png',128,128);
	},
	create: function () {
		//settle sound issue
		//make collide event for center boundary
			
		game.physics.startSystem(Phaser.Physics.ARCADE);

			//here, we add the image starfield as a tileSprite. 
		starfield = game.add.tileSprite(0, 0, window.innerWidth,window.innerHeight, 'stars');
		boundary= game.add.sprite(0, window.innerHeight/2, 'center');
		boundary.width= window.innerWidth*3;
		boundary.enableBody= true;
		boundary.anchor.setTo(0.5);
		boundary.alpha=0;
		this.physics.arcade.enable(boundary);
		boundary.body.immovable= true;
		
		//shot=game.add.audio('shot');
		
		
		explosionsound= game.add.audio('explosionsound');
		explosionsound.allowMultiple= true;
		
		aliens=game.add.group();

		aliens.enableBody=true;
		aliens.physicsBodyType = Phaser.Physics.ARCADE;
		//add the bullets as a group, and a whole bunch of other declarations.
		//  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		     //  An explosion pool....yes explosions! woohoo!
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'explode');
		    explosions.forEach(setupAlien, this);
		    
		for (var i=0;i<8;i++){
			for(var h=0;h<8;h++){
				var alien=aliens.create(i*(window.innerWidth/8)+20,h*(window.innerHeight/16)+50,'baddie');
				alien.animations.add('dance',[0,1,2,3],10,true);
				alien.animations.play('dance');
			}
		}
		hero=game.add.sprite(game.world.width/2,game.world.height-100,'dude',4);
		hero.enableBody=true;
		game.physics.arcade.enable(hero);
		hero.inputEnabled= true;
		hero.body.collideWorldBounds= true;
		
		//hero.animations.add('walkleft',[0,1,2,3],10,true);
		//hero.animations.add('walkright',[5,6,7,8],10,true);

		//cursors=game.input.keyboard.createCursorKeys();
		//leftKey=game.input.keyboard.addKey(Phaser.Keyboard.A);
		//rightKey=game.input.keyboard.addKey(Phaser.Keyboard.D);
		
		
		game.inputEnabled=true;
		
        
        game.time.events.loop(Phaser.Timer.SECOND=400, fireAtEnemy, this);
        //game.input.onTap.add(fireAtEnemy,this);
		
	},
	update: function () {
		
		starfield.tilePosition.y += 2;

			hero.body.velocity.x=0;
			this.physics.arcade.collide(hero, boundary);
			
			
			//  If the sprite is > 8px away from the pointer then let's move to it
    if (game.physics.arcade.distanceToPointer(hero, game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(hero, 300);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        hero.body.velocity.set(0);
    }


	/*	if (cursors.left.isDown || leftKey.isDown) {
			hero.body.velocity.x=-200;
			hero.animations.play('walkleft');

		} else if (cursors.right.isDown || rightKey.isDown){

			hero.body.velocity.x=200;
			hero.animations.play('walkright');

		} else {

			hero.animations.stop();
			hero.frame=4;
		}

*/
		//our first game rule...what to do when a bullets overlap with aliens.
		//overlap requires 5 parameters. You have to let overlap know 5 things in order for 
		//it to work. The first 2 are  what two things are involved in overlap...in this case,
		//bullets and aliens. 
		//Next, what to do when they overlap. The function killAlien will be executed (pun!)
		game.physics.arcade.overlap(bullets,aliens,killAlien,null, this);
		

	}

}

function fireAtEnemy () {

	//no more pew pew! Here's what to do when the mouse is clicked.
	
	//first, create a bullet at the location of the hero.

	bullet=bullets.create(hero.x,hero.y,'pewpew');
	//shot.play();
	//next change gradually the position of the bullet image from the location of the hero to the top of the screen..or off the screen
	game.add.tween(bullet).to({y:-100},500,"Linear",true);

}
//we also set up the alien for the explosions 
function setupAlien(alien) {

    alien.anchor.x = 0.5;
    alien.anchor.y = 0.5;
    alien.animations.add('explode');

}
//Here is what to do when bullet and alien overlap
function killAlien (bullet,alien){

	bullet.kill();
	alien.kill();
	explosionsound.play();

	//how about some explosions!
	//  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('explode', 30, false, true);
}


game.state.add('spaceshooter',SpaceShooter);
game.state.start('spaceshooter');