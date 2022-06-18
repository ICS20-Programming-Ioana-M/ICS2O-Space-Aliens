/* global Phaser */

// Copyright (c) 2022 Ioana Marinescu All rights reserved
//
// Created by: Ioana
// Created on: 6/8/2022
// js for game scene

class GameScene extends Phaser.Scene {

  // creates alien
  createAlien () {
    // choses number between 1 & 1920
    const alienXLocation = Math.floor(Math.random() * 1920) + 1
    // choses number between 1 & 50 
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 
    // 50% chance to add a minus sign 
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 

    // makes an alien and has physics to make it move
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }

  // setup upon class being called
  constructor () {
    super({ key: 'gameScene' })

    // default for spaceship
    this.ship = null
    this.fireMissile = false
    // default for scoreboard 
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }

    // default for game over
    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#0x5f6e7a')
  }

  preload () {
    console.log('Game Scene')

    // images for background, ship, missile and alien
    this.load.image('starBackground', 'assets/starBackground.png')
    this.load.image('ship', 'assets/spaceShip.png')
    this.load.image('missile', 'assets/missile.png')
    this.load.image('alien', 'assets/alien.png')
    // sounds for laser, explosion, and bomb
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
  }

  // so much happening in here but basically it just makes things
  create (data) {
    // sets background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
    this.background.setOrigin(0, 0)

    // sets score
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    // sets ship
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

    // create a group for the missiles
    this.missileGroup = this.physics.add.group()

    // create a group for the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    // Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('bomb')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
  }

  // for moving things
  update (time, delta) {
    // declares consts for right, left, and space key functionality
    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('SPACE')

    // moves ship left
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }

    // moves ship right
    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }

    // shoots missile
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
        this.missileGroup.add(aNewMissile)
        this.sound.play('laser')
      }
    }
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 50) {
        item.destroy()
      }
    })

    this.alienGroup.children.each(function (item) {
      const alienXLocation = Math.floor(Math.random() * 1920) + 1
      if (item.y > 1080) {
        item.x = alienXLocation
        item.y = 0
      }
      if (item.x > 1920) {
        item.x = alienXLocation
        item.y = 0
      }
    })
  }
}

export default GameScene