
var MainMenu = {

  create: function () {
    backgroundMusic = game.add.audio('background_music');
    backgroundMusic.loop = true;
    backgroundMusic.play();

    this.background = game.add.sprite(0, 0, 'background');

    this.onStartClick = function () {
      game.state.start('car_choose');
    };

    this.startButton = game.add.button(game.world.centerX, 200, 'start_button', this.onStartClick, this, 2, 1, 0);
    this.startButton.anchor.setTo(0.5, 0.5);

    this.onCreditsClick = function () {
      game.state.start('credits');
    }

    this.creditsButton = game.add.button(game.world.centerX, 264, 'credits_button', this.onCreditsClick, this, 0, 0, 0);
    this.creditsButton.anchor.setTo(0.5, 0.5);
  }

};
