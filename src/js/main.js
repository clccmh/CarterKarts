var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('car', '/assets/sprites/RedCar.png');
  game.load.tilemap('level', 'assets/maps/Level.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tilesheet', 'assets/tilesheets/tilesheet.png');
}

var car;

function create() {
  game.time.advancedTiming = true;

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#0072bc';

  map = game.add.tilemap('level');
  map.addTilesetImage('tilesheet', 'tilesheet');
  grass = map.createLayer('Grass');
  road = map.createLayer('Road');
  //layer.resizeWorld();


  game.physics.arcade.enable(road);

  grass.resizeWorld();


  car = game.add.sprite(400, 300, 'car');
  car.anchor.setTo(0.5, 0.5);
  car.scale.setTo(.25,.25);
  car.enableBody = true;


  game.physics.enable(car, Phaser.Physics.ARCADE);
  game.physics.arcade.collide(car, road)

  car.body.maxAngular = 300;
  car.body.angularDrag = 900;

  car.body.drag.set(100);
  car.body.maxVelocity.set(500);

  car.body.collideWorldBounds = true;

  game.camera.follow(car);

}

function update() {

  car.body.angularAcceleration = 0;
  car.body.acceleration.set(0);
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    car.body.angularAcceleration -= 900;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    car.body.angularAcceleration += 900;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    game.physics.arcade.velocityFromAngle(car.angle, 500, car.body.velocity);
    //game.physics.arcade.accelerationFromRotation(car.rotation, 1000, car.body.acceleration);
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
    game.physics.arcade.velocityFromAngle(car.angle, -500, car.body.velocity);
    //game.physics.arcade.velocityFromAngle(car.angle, -100, car.body.velocity);
  }


}

function render() {
  game.debug.text(game.time.fps, 2, 14, "#00ff00");
  game.debug.text(car.body.acceleration, 2, 32, "#00ff00");
  game.debug.text(car.body.velocity, 2, 50, "#00ff00");
  game.debug.text(car.body.speed, 2, 75, "#00ff00");
  game.debug.cameraInfo(game.camera, 32, 150);
}

