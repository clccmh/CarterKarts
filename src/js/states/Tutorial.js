
var Tutorial = {
  create: function () {
    instructions = game.add.text(game.world.centerX, game.world.centerY, "Steer your car with:\n\nThe arrow keys\nor\nThe w,a,s,d keys");
    instructions.anchor.setTo(0.5);
    instructions.fontSize = 40;
    game.time.events.add(Phaser.Timer.SECOND*2, function() {
      game.state.start('game')
    }, this);
  },
}
