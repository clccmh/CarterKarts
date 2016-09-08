
var MainMenu = {

  preload: function () {
    game.load.spritesheet('start_button', 'assets/buttons/start_button.png', 256, 64);
    game.load.spritesheet('credits_button', 'assets/buttons/credits_button.png', 256, 64);

    game.load.image('background', 'assets/images/main_background.png');
  },

  create: function () {
    game.stage.backgroundColor = '#FF9E1F';
    //this.background = game.add.image(0, 0, 1280, 720, 'background');
    this.background = game.add.sprite(0, 0, 'background');

    this.onStartClick = function () {
      game.state.start('game');
    };

    this.startButton = game.add.button(game.world.centerX, 200, 'start_button', this.onStartClick, this, 2, 1, 0);
    this.startButton.anchor.setTo(0.5, 0.5);

    this.onCreditsClick = function () {
      game.state.start('credits');
    }

    this.creditsButton = game.add.button(game.world.centerX, 264, 'credits_button', this.onCreditsClick, this, 0, 0, 0);
    this.creditsButton.anchor.setTo(0.5, 0.5);
  },

  update: function () {

  }

};
