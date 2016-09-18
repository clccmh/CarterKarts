
var CarUpgrade = {
  preload: function () {
    game.load.spritesheet('engine_button', 'assets/buttons/engine.png', 256, 64);
    game.load.spritesheet('tires_button', 'assets/buttons/tires.png', 256, 64);
    game.load.spritesheet('strength_button', 'assets/buttons/strength.png', 256, 64);
  },

  create: function () {
    upgradeHeading = game.add.text(game.world.centerX, 100, "What part do you want to upgrade?\n You have 1 credit.");
    upgradeHeading.anchor.setTo(0.5);
    upgradeHeading.fontSize = 40;

    this.startNextLevel = function () {
      game.state.start('level' + (parseInt(game.levelNumber)+1));
    };

    this.onEngineClick = function () {
      game.enginePoints += 1;
      this.startNextLevel();
    };

    this.engineButton = game.add.button(game.world.centerX, game.world.centerY-100, 'engine_button', this.onEngineClick, this, 2, 1, 0);
    this.engineButton.anchor.setTo(0.5, 0.5);

    this.tiresButton = game.add.button(game.world.centerX, game.world.centerY, 'tires_button', this.onEngineClick, this, 2, 1, 0);
    this.tiresButton.anchor.setTo(0.5, 0.5);

    this.strengthButton = game.add.button(game.world.centerX, game.world.centerY+100, 'strength_button', this.onEngineClick, this, 2, 1, 0);
    this.strengthButton.anchor.setTo(0.5, 0.5);

  }
};
