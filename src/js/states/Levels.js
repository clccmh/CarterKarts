
var Level1 = {
  create: function () {
    game.add.audio('level1Sound').play();
    game.stage.backgroundColor = '#B8B8B8';
    console.log('Level1');
    levelHeading = game.add.text(game.world.centerX, 250, "Level 1");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 2;
    game.timeToFinish = 38 + (5*game.adapt);
    game.levelNumber = '1';
    game.hasAi = false;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "Before you can race on the circuit, you must qualify.\nCan you beat the clock?\nLaps: " + game.lapsInRace + "\nTime: " + game.timeToFinish);
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*5, function() {
      game.state.start('game')
    }, this);
  }
};

var Level1Win = {
 create: function () {
    game.add.audio('winSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "You Beat the Clock to Qualify!");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('upgrade')
    }, this);
  }
};

var Level1Lose = {
 create: function () {
    game.add.audio('loseSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;
    game.adapt++;
    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('level1')
    }, this);
  }
};


var Level2 = {
  create: function () {
    game.add.audio('level2Sound').play();
    game.stage.backgroundColor = '#B8B8B8';
    console.log('Level2');
    levelHeading = game.add.text(game.world.centerX, 150, "Level 2");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 2;
    game.levelNumber = '2';
    game.hasAi = true;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "Congrats!! You qualified. It's time to race with the big boys in \nyour first race of the season!\n\nBeat the other cars to win.\n\nLaps: " + game.lapsInRace);
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*7, function() {
      game.state.start('game')
    }, this);
  }
};

var Level2Win = {
 create: function () {
    game.add.audio('winSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "You win!");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('upgrade')
    }, this);
  }
};

var Level2Lose = {
 create: function () {
    game.add.audio('loseSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;
    game.adapt++;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('level2')
    }, this);
  }
};

var Level3 = {
  create: function () {
    game.add.audio('level3Sound').play();
    game.stage.backgroundColor = '#B8B8B8';
    console.log('Level3');
    levelHeading = game.add.text(game.world.centerX, 250, "Level 3");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 3;
    game.levelNumber = '3';
    game.hasAi = true;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "Things just got a little more curvy, and a little bit longer. \n\n You will now race in three laps arround the world's windiest road.");
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*6, function() {
      game.state.start('game')
    }, this);
  }
};

var Level3Win = {
 create: function () {
    game.add.audio('winSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "You won");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('upgrade')
    }, this);
  }
};

var Level3Lose = {
 create: function () {
    game.add.audio('loseSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.adapt++;
      game.state.start('level3')
    }, this);
  }
};

var Level4 = {
  create: function () {
    game.add.audio('level4Sound').play();
    game.stage.backgroundColor = '#B8B8B8';
    console.log('Level4');
    levelHeading = game.add.text(game.world.centerX, 250, "Level 4");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 3;
    game.levelNumber = '4';
    game.hasAi = true;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "Sometimes in a race you have decisions, the easy path isn't always the best.\n\n Laps: 3");
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*6, function() {
      game.state.start('game')
    }, this);
  }
};

var Level4Win = {
  create: function () {
    game.add.audio('winSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "You won");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('upgrade')
    }, this);
  }
};

var Level4Lose = {
 create: function () {
    game.add.audio('loseSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.adapt++;
      game.state.start('level4')
    }, this);
  }
};


var Level5 = {
  create: function () {
    game.add.audio('level5Sound').play();
    game.stage.backgroundColor = '#B8B8B8';

    console.log('Level5');
    levelHeading = game.add.text(game.world.centerX, 250, "Level 5");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.lapsInRace = 1;
    game.levelNumber = '5';
    game.hasAi = true;

    levelText = game.add.text(game.world.centerX, game.world.centerY, "You've made it to the championship! \n It's time to put your skills to the test, because you only have one lap to\nget it right.");
    levelText.anchor.setTo(0.5);
    levelText.fontSize = 30;

    game.time.events.add(Phaser.Timer.SECOND*7, function() {
      game.state.start('game')
    }, this);
  }
};

var Level5Win = {
 create: function () {
    game.add.audio('endWinSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "You won!\n\nYou are the best driver in the world!!");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('credits')
    }, this);
  }
};

var Level5Lose = {
  create: function () {
    game.add.audio('loseSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "Sorry, you were too slow\n\nYou will have to try again");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.adapt++;
      game.state.start('level5')
    }, this);
  }
};


var CarDestroyed = {
 preload: function () {
    game.add.audio('carDestroyedSound').play();
    game.stage.backgroundColor = '#B8B8B8';
    levelHeading = game.add.text(game.world.centerX, 250, "Nice one hot shot!\nYou destroyed your only car.\nTry again next year.");
    levelHeading.anchor.setTo(0.5);
    levelHeading.fontSize = 40;

    game.time.events.add(Phaser.Timer.SECOND*3, function() {
      game.state.start('level1')
    }, this);
  }
};


