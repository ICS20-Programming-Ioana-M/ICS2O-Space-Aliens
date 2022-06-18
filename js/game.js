/* global Phaser */

// Copyright (c) 2022 Ioana All rights reserved
//
// Created by: Ioana Marinescu
// Created on: June 2022

// importing scenes
import SplashScene from './splashScene.js'
import TitleScene from './titleScene.js'
import MenuScene from './menuScene.js'
import GameScene from './gameScene.js'
import InstructionScene from './instructionScene.js'

// game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const instructionScene = new InstructionScene()

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

// Sets up a new game
const game = new Phaser.Game(config)

// loads scenes
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene', gameScene)
game.scene.add('instructionScene', InstructionScene)

// start title
game.scene.start('splashScene')