/* global Phaser */

// Copyright (c) 2022 Ioana All rights reserved
//
// Created by: Ioana Marinescu
// Created on: June 2022

import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'

// Our game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()

// Game scene startup info
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  // set background color
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // placed in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

// loads scenes
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)

// start title
game.scene.start('splashScene')
