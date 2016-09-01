
window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Carters Carts', { preload: preload, create: create });

  function preload () {

    game.load.image('logo', 'assets/phaser.png');
    game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

  }

  function create () {

    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);

    bmpText = game.add.bitmapText(10, 100, 'carrier_command', "Carter's Carts", 34);
    //bmpText.inputEnabled = true;
  }

};
