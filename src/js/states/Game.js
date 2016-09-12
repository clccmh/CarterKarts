
var GameState = {

  preload: function () {
    switch (carColor) {
      case 'red':
        game.load.image('car', '/assets/sprites/RedCar.png');
      case 'blue':
        game.load.image('car', '/assets/sprites/BlueCar.png');
      case 'yellow':
        game.load.image('car', '/assets/sprites/YellowCar.png');
      case 'green':
        game.load.image('car', '/assets/sprites/RedCar.png');
    }
    game.load.tilemap('level', 'assets/maps/Level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheet', 'assets/tilesheets/tilesheet.png');
  },

  create: function () {

    this.preRace = true;

    mapGroup = game.add.group();
    carGroup = game.add.group();
    textGroup = game.add.group();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    map = game.add.tilemap('level');
    map.addTilesetImage('tilesheet', 'tilesheet');

    grass = map.createLayer('Grass');
    mapGroup.add(grass);
    road = map.createLayer('Road');
    mapGroup.add(road);

    finishLine = game.add.sprite(256, 500);
    finishLine.scale.x = 256;
    finishLine.scale.y = 1;
    finishLine.enableBody = true;
    game.physics.enable(finishLine, Phaser.Physics.ARCADE);
    finishLine.body.immovable = true;

    canLap = game.add.sprite(256, 560);
    canLap.scale.x = 256;
    canLap.scale.y = 1;
    canLap.enableBody = true;
    game.physics.enable(canLap, Phaser.Physics.ARCADE);
    canLap.body.immovable = true;

    this.lapping = false;
    this.laps = 0;

    this.lapText = game.add.text(5, 15, "Laps: 0");
    this.lapText.fontSize = 20;
    this.lapText.fill = "#ffffff";
    this.lapText.fixedToCamera = true;
    textGroup.add(this.lapText);


    map.setCollisionBetween(1, 10000, true, grass);
    grass.resizeWorld();


    this.car = game.add.sprite(400, 300, 'car');
    this.car.anchor.setTo(0.5, 0.5);
    this.car.scale.setTo(.25,.25);
    this.car.enableBody = true;

    carGroup.add(this.car);

    game.physics.enable(this.car, Phaser.Physics.ARCADE);

    this.car.body.maxAngular = 250;
    this.car.body.angularDrag = 900;

    this.car.body.drag.set(100);
    this.car.body.maxVelocity.set(500);

    this.car.body.collideWorldBounds = true;

    game.camera.follow(this.car);

    text = game.add.text(game.camera.width/2, game.camera.height/2, "Ready!");
    text.anchor.setTo(0.5);
    text.fontSize = 80;
    text.fill = "#ffffff";
    textGroup.add(text);

    this.timer = this.game.time.create(this.game);

    this.raceTime = game.add.text(5, 0, "Time: 0.00");
    this.raceTime.fontSize = 20;
    this.raceTime.fill = "#ffffff";
    this.raceTime.fixedToCamera = true;
    textGroup.add(this.raceTime);

    game.time.events.add(Phaser.Timer.SECOND, function() {
      text.setText("Set!");
      game.time.events.add(Phaser.Timer.SECOND, function() {
        text.setText("Go!");
        game.time.events.add(Phaser.Timer.SECOND, function() {
          text.destroy();
          this.preRace = false;
          this.timer.start();
        }, this);
      }, this);
    }, this);


  },

  update: function () {

    if (game.lapsInRace == this.laps) {
      game.world.setBounds(0, 0, game.width, game.height);
      game.state.start('credits');
    }

    game.physics.arcade.collide(this.car, grass)
    if (!this.lapping) {
      game.physics.arcade.collide(this.car, finishLine);
    }

    this.car.body.angularAcceleration = 0;
    this.car.body.acceleration.set(0);
    this.car.body.velocity.x = 0;
    this.car.body.velocity.y = 0;

    if (!this.preRace) {

      if (!this.lapping && game.physics.arcade.collide(this.car, canLap)) {
        console.log('canLap');
        this.lapping = true;
        this.laps += 1;
      }

      if (game.physics.arcade.overlap(this.car, finishLine)) {
        this.lapping = false;
      }

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

    }

  },

  render: function () {
    this.raceTime.setText("Time: " + this.timer.seconds.toFixed(2));
    this.lapText.setText("Laps: " + this.laps);
    game.debug.spriteBounds(finishLine);
    game.debug.spriteBounds(canLap);
  }

};



