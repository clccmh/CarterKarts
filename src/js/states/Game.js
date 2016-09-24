
var GameState = {

  preload: function () {
    if (game.carColor == 'red') {
        this.playerColor = 'red_car';
        this.aiColors = ['blue_car', 'yellow_car', 'green_car'];
    } else if (game.carColor == 'blue') {
        this.playerColor = 'blue_car';
        this.aiColors = ['red_car', 'yellow_car', 'green_car'];
    } else if (game.carColor == 'yellow') {
        this.playerColor = 'yellow_car';
        this.aiColors = ['blue_car', 'red_car', 'green_car'];
    } else if (game.carColor == 'green') {
        this.playerColor = 'green_car';
        this.aiColors = ['blue_car', 'yellow_car', 'red_car'];
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

    // Car damage mechanic
    damageText = game.add.text(5, 45, "Damage:");
    damageText.fontSize = 20;
    damageText.fill = "#ffffff";
    damageText.fixedToCamera = true;
    textGroup.add(damageText);

    redHealth = game.add.sprite(105, 53, 'health_red');
    redHealth.fixedToCamera = true;
    redHealth.scale.x = (100 + (10 * game.strengthPoints)) / 100;
    textGroup.add(redHealth);

    greenHealth = game.add.sprite(105, 53, 'health_green');
    greenHealth.fixedToCamera = true;
    textGroup.add(greenHealth);

    crash = game.add.audio('crash');

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
    this.car.damage = 100 + (10*game.strengthPoints);
    this.car.previousCollision = 0;

    game.camera.follow(this.car);
    
    if (game.hasAi) {
      this.AIs = [game.add.sprite(400, 400, this.aiColors[0]), game.add.sprite(400, 475, this.aiColors[1])];
      console.log(this.AIs);
      for (var i = 0; i < 2; i++) {
        this.AIs[i].anchor.setTo(0.5, 0.5);
        this.AIs[i].scale.setTo(.25, .25);
        this.AIs[i].enableBody = true;
        carGroup.add(this.AIs[i]);
        game.physics.enable(this.AIs[i], Phaser.Physics.ARCADE);
        this.AIs[i].body.maxAngular = 250;
        this.AIs[i].body.angularDrag = 900;
        this.AIs[i].body.drag.set(100);
        this.AIs[i].maxVelocity = game.carVelocity + 68 + (Math.random() * (15)) - (5 * game.adapt);
        this.AIs[i].body.maxVelocity.set(this.AIs[i].maxVelocity);
        this.AIs[i].body.collideWorldBounds = true;
        this.AIs[i].body.bounce = 0;
        this.AIs[i].laps = 0;
        this.AIs[i].previousLapTime = 0;
      }
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

      if (game.hasAi) {
        var first = true;
        for (var i = 0; i < 2; i++) {
          if (this.AIs[i].laps >= this.laps) {
            first = false;
          }
        }
        game.state.start('level' + game.levelNumber + (first ? '_win' : '_lose'));
      } else {
        if (this.timer.seconds.toFixed(2) < game.timeToFinish) {
          game.state.start('level' + game.levelNumber + '_win');
        } else {
          game.state.start('level' + game.levelNumber + '_lose');
        }
      }
    }

    if (this.car.damage < 1) {
      game.world.setBounds(0, 0, game.width, game.height);
      game.state.start('car_destroyed');
    }

    game.physics.arcade.collide(this.car, grass, function () {
      if (this.car.previousCollision + .1 < this.timer.seconds) {
        crash.play();
        console.log('damage: ' + --this.car.damage);
        this.car.previousCollision = this.timer.seconds;
      }
    }, null, this);

    if (game.hasAi) {
      for (var i = 0; i < 2; i++) {
        game.physics.arcade.collide(this.AIs[i], this.car, function () {
          if (this.car.previousCollision + .1 < this.timer.seconds) {
            crash.play();
            console.log('damage: ' + --this.car.damage);
            this.car.previousCollision = this.timer.seconds;
          }
        }, null, this);
      }
    }

    this.car.body.angularAcceleration = 0;
    this.car.body.acceleration.set(0);
    if (!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.car.body.velocity.x = 0;
      this.car.body.velocity.y = 0;
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
        for (var i = 0; i < 2; i++) {
          //Update AI
          this.AIs[i].body.velocity.x = 0;
          this.AIs[i].body.velocity.y = 0;
          tileX = Math.floor(this.AIs[i].x / 256); 
          tileY = Math.floor(this.AIs[i].y / 256);
          game.physics.arcade.collide(this.AIs[i], grass, function () {
            if (this.AIs[i].angle == 0 || this.AIs[i].angle == 180 || this.AIs[i].angle == -180) {
              if (map.getTileAbove(map.getLayer(road), tileX, tileY).index != -1) {
                this.AIs[i].angle = -90;
              } else if (map.getTileBelow(map.getLayer(road), tileX, tileY).index != -1) {
                this.AIs[i].angle = 90;
              }
            }  else if (this.AIs[i].angle == 90 || this.AIs[i].angle == -90) {
              if (map.getTileRight(map.getLayer(road), tileX, tileY).index != -1) {
                this.AIs[i].angle = 0;
              } else if (map.getTileLeft(map.getLayer(road), tileX, tileY).index != -1) {
                this.AIs[i].angle = 180;
              }
            }
          }, null, this);

          game.physics.arcade.collide(this.AIs[i], finishLine, null, function () {
            console.log('ai lap');
            if (this.AIs[i].y > finishLine.y) {
              if (this.AIs[i].previousLapTime + 5 < this.timer.seconds) {
                console.log('lap');
                this.AIs[i].laps++;
              }
              this.AIs[i].previousLapTime = this.timer.seconds;
              return false;
            }
            return true;
          }, this);

          game.physics.arcade.velocityFromAngle(this.AIs[i].angle, this.AIs[i].maxVelocity, this.AIs[i].body.velocity);
        }

      }
    }

  },

  render: function () {
    this.raceTime.setText("Time: " + this.timer.seconds.toFixed(2));
    this.lapText.setText("Laps: " + this.laps);
    game.debug.spriteBounds(finishLine);
    greenHealth.scale.x = this.car.damage / 100;
  }

};

