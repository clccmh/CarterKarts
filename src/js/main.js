var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '');
var carColor = 'red';

var bootState = {
  preload: function () {
    game.load.image('bar', 'assets/sprites/bar.png');
  },

  create: function () {
    game.state.add('initialState', initialState);
    game.state.start('initialState');
  }
};

var initialState = {
  preload: function () {
    game.stage.backgroundColor = '#B8B8B8';
    preloadBar = this.add.sprite(game.world.centerX, game.world.centerY, 'bar');
    preloadBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(preloadBar);

    game.load.script('game', 'js/states/Game.js');
    game.load.script('main_menu', 'js/states/MainMenu.js');
    game.load.script('credits', 'js/states/Credits.js');
    game.load.script('car_choose', 'js/states/CarChoose.js');
    game.load.script('tutorial', 'js/states/Tutorial.js');
    game.load.script('levels', 'js/states/Levels.js');
    game.load.script('upgrade', 'js/states/CarUpgrade.js');

    game.load.spritesheet('start_button', 'assets/buttons/start_button.png', 256, 64);
    game.load.spritesheet('credits_button', 'assets/buttons/credits_button.png', 256, 64);

    game.load.image('background', 'assets/images/main_background.png');

    game.load.audio('background_music', 'assets/audio/background.mp3')

    game.load.image('red_car', 'assets/sprites/RedCar.png');
    game.load.image('blue_car', 'assets/sprites/BlueCar.png');
    game.load.image('yellow_car', 'assets/sprites/YellowCar.png');
    game.load.image('green_car', 'assets/sprites/GreenCar.png');

    game.load.image('tilesheet', 'assets/tilesheets/tilesheet.png');

    game.load.audio('car', 'assets/audio/choose_your_car.mp3')
  },

  create: function () {
    game.state.add('main_menu', MainMenu);
    game.state.add('car_choose', CarChoose);
    game.state.add('tutorial', Tutorial);
    game.state.add('level1', Level1);
    game.state.add('level1_win', Level1Win);
    game.state.add('level1_lose', Level1Lose);
    game.state.add('level2', Level2);
    game.state.add('level2_win', Level2Win);
    game.state.add('level2_lose', Level2Lose);
    game.state.add('upgrade', CarUpgrade);
    game.state.add('game', GameState);
    game.state.add('credits', Credits);

    game.state.start('main_menu');
  }
};

game.enginePoints = 0;
game.tirePoints = 0;
game.strengthPoints = 0;
game.state.add('bootState', bootState);
game.state.start('bootState');
