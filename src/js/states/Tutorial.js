
var Tutorial = {
  preload: function () {
    game.load.audio('tut', 'assets/audio/tutorial.mp3')
  },
  create: function () {
    tut = game.add.audio('tut');
    tut.play();

    instructions = game.add.text(game.world.centerX, game.world.centerY, "Steer your car with:\n\nThe arrow keys\nor\nThe w,a,s,d keys\n\nDrift with the spacebar\n\nDon't damage your car!");
    instructions.anchor.setTo(0.5);
    instructions.fontSize = 40;
    game.time.events.add(Phaser.Timer.SECOND*7, function() {
      game.state.start('level1')
    }, this);
  },
}
