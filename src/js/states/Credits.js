
var Credits = {
  preload: function () {
    game.stage.backgroundColor = '#B8B8B8';
  },

  create: function() {
    console.log('credits');
    creditText = game.add.text(game.world.centerX, game.world.centerY, "Thank you for playing Carter Karts!\n\n\nDeveloper: Carter Hay\n\nAsset Creators:\nRoads: Benjamin Pickhardt\nCars: Bahi (opengameart.org)\nGrass: Charlie (opengameart.org)\nMusic: Gobusto (opengameart.org)");
    creditText.anchor.setTo(0.5);
    creditText.fontSize = 40;

    linkText = game.add.text(game.world.centerX, game.world.centerY*2 - 50, "Links in README");
    linkText.anchor.setTo(0.5);
    linkText.fontSize = 20;
  }
};
