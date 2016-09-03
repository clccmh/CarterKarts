var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('car', '/assets/sprites/RedCar.png');
  game.load.image('grass', 'http://static.yooco.de/s1/images/website/2813521/image/texture-grass.jpg')
}

var sprite;

function create() {
  game.time.advancedTiming = true;

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#0072bc';

  sprite = game.add.sprite(400, 300, 'car');
  sprite.anchor.setTo(0.5, 0.5);
  sprite.scale.setTo(.25,.25);
  sprite.enableBody = true;


  game.physics.enable(sprite, Phaser.Physics.ARCADE);

  sprite.body.maxAngular = 300;
  sprite.body.angularDrag = 900;

  sprite.body.drag.set(100);
  sprite.body.maxVelocity.set(500);

  sprite.body.collideWorldBounds = true;
  //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  cursors = game.input.keyboard.createCursorKeys();

}

function update() {

  sprite.body.angularAcceleration = 0;
  sprite.body.acceleration.set(0);
  sprite.body.velocity.x = 0;
  sprite.body.velocity.y = 0;

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    sprite.body.angularAcceleration -= 900;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    sprite.body.angularAcceleration += 900;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    game.physics.arcade.velocityFromAngle(sprite.angle, 500, sprite.body.velocity);
    //game.physics.arcade.accelerationFromRotation(sprite.rotation, 1000, sprite.body.acceleration);
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    game.physics.arcade.velocityFromAngle(sprite.angle, -500, sprite.body.velocity);
    //game.physics.arcade.velocityFromAngle(sprite.angle, -100, sprite.body.velocity);
  }


}

function render() {
  game.debug.text(game.time.fps, 2, 14, "#00ff00");
  game.debug.text(sprite.body.acceleration, 2, 32, "#00ff00");
  game.debug.text(sprite.body.velocity, 2, 50, "#00ff00");
  game.debug.text(sprite.body.speed, 2, 75, "#00ff00");
}

