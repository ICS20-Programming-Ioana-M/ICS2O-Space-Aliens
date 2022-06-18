/* global Phaser */

// Copyright (c) 2022 Ioana All rights reserved
//
// Created by: Ioana Marinescu
// Created on: June 2022
// For the instruction scene

class InstructionScene extends Phaser.Scene {
  constructor () {
    super({ key: 'instructionScene' })
    // default info
    this.instructionSceneBackgroundImage = null
    this.backButton = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: '70px Agency FB', fill: '#db020d', align: 'center' }
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Instruction Scene')
    // images
    this.load.image('instructionSceneBackground', 'assets/aliens_screen_image2.jpg')
    this.load.image('backButton', 'assets/back.png')
  }

  create (data) {
    // background
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'instructionSceneBackground').setScale(1.5)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    // back button
    this.backButton = this.add.sprite(1920 / 2, (700) + 100, 'backButton').setScale(0.5)
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on('pointerdown', () => this.buttonClicked())
    // actual instruction text
    this.titleSceneText = this.add.text(1920 / 2, 350, 'Welcome!\nIn this game you play as a very lost astronaut that managed to find life!\nThere are oncoming aliens that will crash into you if you do not shoot them \nor get out of their way.\nMove LEFT: left arrow key\nMove RIGHT: right arrow key\nSHOOT missiles: Space key', this.titleSceneTextStyle).setOrigin(0.5)
  }

  update (time, delta) {
  }
  
  buttonClicked() {
    this.scene.start('menuScene')
  }
}

export default InstructionScene