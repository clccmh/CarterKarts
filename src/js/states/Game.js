
var GameState = {

  preload: function () {
    game.load.image('car', '/assets/sprites/RedCar.png');
    game.load.tilemap('level', 'assets/maps/Test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheet', 'assets/tilesheets/tilesheet.png');
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    map = game.add.tilemap('level');
    map.addTilesetImage('tilesheet', 'tilesheet');
    grass = map.createLayer('Grass');
    road = map.createLayer('Road');

    map.setCollisionBetween(1, 10000, true, grass);

    grass.resizeWorld();

    this.car = game.add.sprite(400, 300, 'car');
    this.car.anchor.setTo(0.5, 0.5);
    this.car.scale.setTo(.25,.25);
    this.car.enableBody = true;


    game.physics.enable(this.car, Phaser.Physics.ARCADE);

    this.car.body.maxAngular = 250;
    this.car.body.angularDrag = 900;

    this.car.body.drag.set(100);
    this.car.body.maxVelocity.set(500);

    this.car.body.collideWorldBounds = true;

    game.camera.follow(this.car);

  },

  update: function () {
    game.physics.arcade.collide(this.car, grass)

    this.car.body.angularAcceleration = 0;
    this.car.body.acceleration.set(0);
    this.car.body.velocity.x = 0;
    this.car.body.velocity.y = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      if (this.car.body.acceleration > 0) {
        this.car.body.angularVelocity = 0;
        this.car.body.angularAcceleration = -1800;
      }
      this.car.body.angularAcceleration -= 900;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      if (this.car.body.acceleration < 0) {
        this.car.body.angularVelocity = 0;
        this.car.body.angularAcceleration = 1800;
      }
      this.car.body.angularAcceleration += 900;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      game.physics.arcade.velocityFromAngle(this.car.angle, 500, this.car.body.velocity);
      //game.physics.arcade.accelerationFromRotation(car.rotation, 1000, car.body.acceleration);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      game.physics.arcade.velocityFromAngle(this.car.angle, -500, this.car.body.velocity);
      //game.physics.arcade.velocityFromAngle(car.angle, -100, car.body.velocity);
    }


  },

  render: function () {

  }

};



