
var GameState = {

  preload: function () {
    if (game.carColor == 'red') {
        this.playerColor = 'red_car';
        this.aiColor = 'blue_car';
    } else if (game.carColor == 'blue') {
        this.playerColor = 'blue_car';
        this.aiColor = 'red_car';
    } else if (game.carColor == 'yellow') {
        this.playerColor = 'yellow_car';
        this.aiColor = 'red_car';
    } else if (game.carColor == 'green') {
        this.playerColor = 'green_car';
        this.aiColor = 'red_car';
    }

    game.load.tilemap('level', 'assets/maps/Level' + game.levelNumber + '.json', null, Phaser.Tilemap.TILED_JSON);
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

    finishLine = game.add.sprite(256, 512);
    finishLine.scale.x = 10;
    finishLine.scale.y = .01;
    finishLine.enableBody = true;
    game.physics.enable(finishLine, Phaser.Physics.ARCADE);
    finishLine.body.immovable = true;

    this.laps = 0;
    this.previousLapTime = 0;

    this.lapText = game.add.text(5, 15, "Laps: 0");
    this.lapText.fontSize = 20;
    this.lapText.fill = "#ffffff";
    this.lapText.fixedToCamera = true;
    textGroup.add(this.lapText);

    map.setCollisionBetween(1, 10000, true, grass);
    grass.resizeWorld();

    this.car = game.add.sprite(400, 300, this.playerColor);
    this.car.anchor.setTo(0.5, 0.5);
    this.car.scale.setTo(.25,.25);
    this.car.enableBody = true;
    carGroup.add(this.car);
    game.physics.enable(this.car, Phaser.Physics.ARCADE);
    this.car.body.maxAngular = 250;
    this.car.body.angularDrag = 900;

    game.carVelocity = 500 + (game.enginePoints*10);
    this.car.body.drag.set(100);
    this.car.body.maxVelocity.set(game.carVelocity);
    this.car.body.collideWorldBounds = true;

    game.camera.follow(this.car);
    
    if (game.hasAi) {
      this.ai = game.add.sprite(400, 400, this.aiColor);
      this.ai.anchor.setTo(0.5, 0.5);
      this.ai.scale.setTo(.25, .25);
      this.ai.enableBody = true;
      carGroup.add(this.ai);
      game.physics.enable(this.ai, Phaser.Physics.ARCADE);
      this.ai.body.maxAngular = 250;
      this.ai.body.angularDrag = 900;
      this.ai.body.drag.set(100);
      this.ai.body.maxVelocity.set(game.carVelocity + 75);
      this.ai.body.collideWorldBounds = true;
    }

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

    // Check if the game if over or not
    if (game.lapsInRace == this.laps) {
      game.world.setBounds(0, 0, game.width, game.height);
      if (this.timer.seconds.toFixed(2) < game.timeToFinish) {
        game.state.start('level' + game.levelNumber + '_win');
      } else {
        game.state.start('level' + game.levelNumber + '_lose');
      }
    }

    game.physics.arcade.collide(this.car, grass)
    //game.physics.arcade.collide(this.car, this.ai)

    this.car.body.angularAcceleration = 0;
    this.car.body.acceleration.set(0);
    if (!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.car.body.velocity.x = 0;
      this.car.body.velocity.y = 0;
    } else {
      console.log('drifting');
    }

    // Disables input while the countdown is happening
    if (!this.preRace) {

      game.physics.arcade.collide(this.car, finishLine, null, function () {
        if (this.car.y > finishLine.y) {
          if (this.previousLapTime + 5 < this.timer.seconds) {
            console.log('lap');
            this.laps++;
          }
          this.previousLapTime = this.timer.seconds;
          return false;
        }
        return true;
      }, this);

      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        if (this.car.body.acceleration > 0) {
          this.car.body.angularVelocity = 0;
          this.car.body.angularAcceleration = -1500;
        }
        this.car.body.angularAcceleration -= 500 + (game.tirePoints*200);
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        if (this.car.body.acceleration < 0) {
          this.car.body.angularVelocity = 0;
          this.car.body.angularAcceleration = 1500;
        }
        this.car.body.angularAcceleration += 500 + (game.tirePoints*200);
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
          console.log('drifting');
          game.physics.arcade.accelerationFromRotation(this.car.rotation, game.carVelocity, this.car.body.acceleration);
        } else {
          game.physics.arcade.velocityFromAngle(this.car.angle, game.carVelocity, this.car.body.velocity);
        }
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
          console.log('drifting');
          game.physics.arcade.accelerationFromRotation(this.car.rotation, -game.carVelocity, this.car.body.acceleration);
        } else {
          game.physics.arcade.velocityFromAngle(this.car.angle, -game.carVelocity, this.car.body.velocity);
        }
      }
      
      if (game.hasAi) {
        //Update AI
        this.ai.body.velocity.x = 0;
        this.ai.body.velocity.y = 0;
        tileX = Math.floor(this.ai.x / 256); 
        tileY = Math.floor(this.ai.y / 256);
        game.physics.arcade.collide(this.ai, grass, function () {
          console.log('Above: ' + map.getTileAbove(map.getLayer(road), tileX, tileY).index);
          console.log('Below: ' + map.getTileBelow(map.getLayer(road), tileX, tileY).index);
          console.log('Right: ' + map.getTileRight(map.getLayer(road), tileX, tileY).index);
          console.log('Left: ' + map.getTileLeft(map.getLayer(road), tileX, tileY).index);
          if (this.ai.angle == 0 || this.ai.angle == 180 || this.ai.angle == -180) {
            if (map.getTileAbove(map.getLayer(road), tileX, tileY).index != -1) {
              this.ai.angle = -90;
            } else if (map.getTileBelow(map.getLayer(road), tileX, tileY).index != -1) {
              this.ai.angle = 90;
            }
          }  else if (this.ai.angle == 90 || this.ai.angle == -90) {
            if (map.getTileRight(map.getLayer(road), tileX, tileY).index != -1) {
              this.ai.angle = 0;
            } else if (map.getTileLeft(map.getLayer(road), tileX, tileY).index != -1) {
              this.ai.angle = 180;
            }
          }
        }, null, this);
        game.physics.arcade.velocityFromAngle(this.ai.angle, game.carVelocity + 75, this.ai.body.velocity);
      }
    }

  },

  render: function () {
    this.raceTime.setText("Time: " + this.timer.seconds.toFixed(2));
    this.lapText.setText("Laps: " + this.laps);
    game.debug.spriteBounds(finishLine);
  }

};

