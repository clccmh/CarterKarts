
var CarChoose = {
  preload: function () {
    game.load.image('RedCar', 'assets/sprites/RedCar.png');
    game.load.image('BlueCar', 'assets/sprites/BlueCar.png');
    game.load.image('YellowCar', 'assets/sprites/YellowCar.png');
    game.load.image('GreenCar', 'assets/sprites/GreenCar.png');

    game.load.audio('car', 'assets/audio/choose_your_car.mp3')
  },

  create: function () {

    car = game.add.audio('car');
    car.play();

    text = game.add.text(game.world.centerX, 200, "Choose your car!");
    text.anchor.setTo(0.5);
    text.fontSize = 40;

    startNextState = function () {
      game.state.start('tutorial');
    };

    onRedClick = function () {
      console.log('RedCar');
      game.carColor = 'red';
      startNextState();
    };
    
    redCar = game.add.button(160, game.world.centerY, 'RedCar', onRedClick, this, 2, 1, 0);
    redCar.anchor.setTo(1, 0.5);
    redCar.angle = -90;

    onBlueClick = function () {
      console.log('BlueCar');
      game.carColor = 'blue';
      startNextState();
    };
    
    blueCar = game.add.button(480, game.world.centerY, 'BlueCar', onBlueClick, this, 2, 1, 0);
    blueCar.anchor.setTo(1, 0.5);
    blueCar.angle = -90;

    onYellowClick = function () {
      console.log('YellowCar');
      game.carColor = 'yellow';
      startNextState();
    };
    
    yellowCar = game.add.button(800, game.world.centerY, 'YellowCar', onYellowClick, this, 2, 1, 0);
    yellowCar.anchor.setTo(1, 0.5);
    yellowCar.angle = -90;

    onGreenClick = function () {
      console.log('GreenCar');
      game.carColor = 'green';
      startNextState();
    };
    
    greenCar = game.add.button(1120, game.world.centerY, 'GreenCar', onGreenClick, this, 2, 1, 0);
    greenCar.anchor.setTo(1, 0.5);
    greenCar.angle = -90;
  },

  update: function() {

  }

};
