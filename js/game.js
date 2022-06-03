/* Global Phaser */

// hold perameters for basic phaser game setup
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1008,
  backgroundcolor: 0x5f6e7a
}

// creates a new game with setup info
const game = new Phaser.Game(config)
console.log(game)