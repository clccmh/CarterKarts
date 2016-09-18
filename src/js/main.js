var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '');
var carColor = 'red';

var initialState = {
  preload: function () {
    game.load.script('game', 'js/states/Game.js');
    game.load.script('main_menu', 'js/states/MainMenu.js');
    game.load.script('credits', 'js/states/Credits.js');
    game.load.script('car_choose', 'js/states/CarChoose.js');
    game.load.script('tutorial', 'js/states/Tutorial.js');
    game.load.script('levels', 'js/states/Levels.js');
    game.load.script('upgrade', 'js/states/CarUpgrade.js');
  },

  create: function () {
    game.stage.backgroundColor = '#B8B8B8';

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
game.state.add('initialState', initialState);
game.state.start('initialState');
