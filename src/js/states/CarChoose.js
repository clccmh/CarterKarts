
var CarChoose = {
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
      console.log('red_car');
      game.carColor = 'red';
      startNextState();
    };
    
    redCar = game.add.button(160, game.world.centerY, 'red_car', onRedClick, this, 2, 1, 0);
    redCar.anchor.setTo(1, 0.5);
    redCar.angle = -90;

    onBlueClick = function () {
      console.log('blue_car');
      game.carColor = 'blue';
      startNextState();
    };
    
    blueCar = game.add.button(480, game.world.centerY, 'blue_car', onBlueClick, this, 2, 1, 0);
    blueCar.anchor.setTo(1, 0.5);
    blueCar.angle = -90;

    onYellowClick = function () {
      console.log('yellow_car');
      game.carColor = 'yellow';
      startNextState();
    };
    
    yellowCar = game.add.button(800, game.world.centerY, 'yellow_car', onYellowClick, this, 2, 1, 0);
    yellowCar.anchor.setTo(1, 0.5);
    yellowCar.angle = -90;

    onGreenClick = function () {
      console.log('green_car');
      game.carColor = 'green';
      startNextState();
    };
    
    greenCar = game.add.button(1120, game.world.centerY, 'green_car', onGreenClick, this, 2, 1, 0);
    greenCar.anchor.setTo(1, 0.5);
    greenCar.angle = -90;
  },

  update: function() {

  }

};
