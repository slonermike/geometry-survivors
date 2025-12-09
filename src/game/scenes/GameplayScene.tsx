import Phaser from 'phaser'
import tweaks from '@/config/tweaks'
import { Player } from '@/game/entities/Player'
import { drawBackgroundGrid } from './utils/backgroundGrid'
import { Projectile } from '../entities/Projectile'

export class GameplayScene extends Phaser.Scene {
  private player!: Player
  private projectiles!: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: 'GameplayScene' })
  }

  preload() {
    this.load.image('entity-swirl', '/entity-swirl.png')
  }

  create() {
    drawBackgroundGrid(this)
    this.projectiles = this.physics.add.group({
      classType: Projectile,
      maxSize: tweaks.maxProjectiles,
      runChildUpdate: true,
    })
    this.player = new Player(this, this.projectiles, 200, 300)

    // Set initial zoom
    const zoom = Math.min(
      this.scale.width / tweaks.baseResolution.width,
      this.scale.height / tweaks.baseResolution.height
    )
    this.cameras.main.setZoom(zoom)

    // Update zoom on scale
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
      const newZoom = Math.min(
        gameSize.width / tweaks.baseResolution.width,
        gameSize.height / tweaks.baseResolution.height
      )
      this.cameras.main.setZoom(newZoom)
    })

    // Test Shape
    this.add.circle(400, 300, 50, 0xff0000)
    this.cameras.main.startFollow(this.player)
  }

  update(_t: number, dt: number) {
    this.player.update(dt)
  }
}
