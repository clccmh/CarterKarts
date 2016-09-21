
var Level1 = {
  preload: function () {
    game.load.audio('level1Sound', 'assets/audio/level1.mp3')
  },
  create: function () {
    game.add.audio('level1Sound').play();

    console.log('Level1');
    levelHeading = game.add.text(game.world.centerX, 250, "Level 1");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 2;
    game.timeToFinish = 38;
    game.levelNumber = '1';
    game.hasAi = false;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "Before you can race on the circuit, you must qualify.\nCan you beat the clock?\nLaps: " + game.lapsInRace + "\nTime: " + game.timeToFinish);
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('game')
    }, this);
  }
};

var Level1Win = {
 preload: function () {
    levelHeading = game.add.text(game.world.centerX, 250, "You Beat the Clock to Qualify!");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('upgrade')
    }, this);
  }
};

var Level1Lose = {
 preload: function () {
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('level1')
    }, this);
  }
};


var Level2 = {
  preload: function () {
    console.log('Level2');
    levelHeading = game.add.text(game.world.centerX, 250, "Level 2");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 2;
    game.timeToFinish = 37.5;
    game.levelNumber = '2';
    game.hasAi = true;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "Congrats!! You qualified. It's time to race with the big boys in your first race of the season!\nLaps: " + game.lapsInRace + "\nTime: " + game.timeToFinish);
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('game')
    }, this);
  }
};

var Level2Win = {
 preload: function () {
    levelHeading = game.add.text(game.world.centerX, 250, "You beat the clock!");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('credits')
    }, this);
  }
};

var Level2Lose = {
 preload: function () {
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('level2')
    }, this);
  }
};


