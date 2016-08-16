//Here we initialise our game by declaring a variable game and assigning it to a Phaser game
//Phaser.Game takes in parameters within the brackets to create a game world 
//They are : (width, height, RenderingMethod,DOM_ID)

var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.CANVAS,'gamearea');

//To start your game server in c9.io, go to the terminal and type 'apachectl start'. Then select 'Preview Running Application'