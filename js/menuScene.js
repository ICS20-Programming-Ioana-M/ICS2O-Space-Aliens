/* global Phaser */

// Copyright (c) 2022 Ioana All rights reserved
//
// Created by: Ioana Marinescu
// Created on: June 2022
// For the title scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.instructionButton = null
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Menu Scene')

    this.load.image('menuSceneBackground', 'assets/aliens_screen_image2.jpg')
    this.load.image('startButton', 'assets/start.png')
    this.load.image('instructionButton', 'assets/instructions.png')
  }

  create (data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(1.5)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())

    this.instructionButton = this.add.sprite(1920 / 2, (700) + 100, 'instructionButton').setScale(0.05)
    this.instructionButton.setInteractive({ useHandCursor: true })
    this.instructionButton.on('pointerdown', () => this.buttonClicked())
  }

  update (time, delta) {
  }

  clickButton () {
    this.scene.start('gameScene')
  }
  buttonClicked() {
    this.scene.start('instructionScene')
  }
}

export default MenuScene