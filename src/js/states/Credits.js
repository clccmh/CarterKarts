
var Credits = {
  preload: function () {
    game.stage.backgroundColor = '#B8B8B8';
  },

  create: function() {
    console.log('credits');
    creditText = game.add.text(game.world.centerX, 25, "Thank you for playing Carter Karts!\n\n\nDeveloper: Carter Hay\n\nAsset Creators:\nRoads: Benjamin Pickhardt\nCars: Bahi (opengameart.org)\nGrass: Charlie (opengameart.org)\nMusic: Gobusto (opengameart.org)");
    creditText.anchor.setTo(0.5, 0);
    creditText.fontSize = 40;

    linkText = game.add.text(game.world.centerX, game.world.height - 150, "Links in README");
    linkText.anchor.setTo(0.5);
    linkText.fontSize = 20;

    this.backButton = game.add.button(game.world.centerX, game.world.height-45, 'back_to_main', function () {
      backgroundMusic.stop();
      game.state.start('main_menu');
    }, this, 2, 1, 0);
    this.backButton.anchor.setTo(0.5, 0.5);
  }
};
