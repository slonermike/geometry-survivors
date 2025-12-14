import Phaser from 'phaser'
import tweaks from '@/config/tweaks'
import { Player } from '@/game/entities/Player'
import { drawBackgroundGrid } from './utils/backgroundGrid'
import { Projectile } from '@/game/entities/Projectile'
import { Enemy } from '@/game/entities/Enemy'
import { SpawnManager } from '@/game/managers/SpawnManager'
import { WAVES } from '@/config/waves'

export class GameplayScene extends Phaser.Scene {
  private player!: Player
  private projectiles!: Phaser.Physics.Arcade.Group
  private enemies!: Phaser.Physics.Arcade.Group
  private spawnManager!: SpawnManager

  constructor() {
    super({ key: 'GameplayScene' })
  }

  preload() {
    this.load.image('entity-swirl', '/entity-swirl.png')
    this.load.image('entity-splat', '/entity-splat.png')
    this.load.image('entity-hex', './entity-hex.png')
  }

  create() {
    drawBackgroundGrid(this)
    this.projectiles = this.physics.add.group({
      classType: Projectile,
      maxSize: tweaks.maxCounts.projectile,
      runChildUpdate: true,
    })
    this.enemies = this.physics.add.group({
      classType: Enemy,
      maxSize: tweaks.maxCounts.enemy,
      runChildUpdate: true,
    })
    this.player = new Player(this, this.projectiles, 200, 300)
    this.spawnManager = new SpawnManager(this, WAVES, this.enemies)

    // Set initial zoom
    const zoom = Math.min(
      this.scale.width / tweaks.baseResolution.width,
      this.scale.height / tweaks.baseResolution.height
    )
    this.cameras.main.setZoom(zoom)

    const bloom = tweaks.rendering.bloom

    this.cameras.main.postFX.addBloom(
      bloom.color,
      bloom.offsetX,
      bloom.offsetY,
      bloom.blurStrength,
      bloom.bloomStrength,
      bloom.steps
    )

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

  update(t: number, dt: number) {
    this.player.update(dt)
    this.spawnManager.update(t, dt)
  }
}
