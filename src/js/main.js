var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example');

var initialState = {
  preload: function () {
    game.load.script('game', 'js/states/Game.js');
    game.load.script('main_menu', 'js/states/MainMenu.js');
    game.load.script('credits', 'js/states/Credits.js');
    game.load.script('car_choose', 'js/states/CarChoose.js');
  },

  create: function () {
    game.stage.backgroundColor = '#B8B8B8';

    game.state.add('main_menu', MainMenu);
    game.state.add('game', GameState);
    game.state.add('car_choose', CarChoose);
    game.state.add('credits', Credits);

    game.state.start('main_menu');
  }
};

game.state.add('initialState', initialState);
game.state.start('initialState');
