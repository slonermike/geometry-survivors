import { WEAPONS } from '@/config/weapons'
import type { PlayerWeapon } from './Player'
import { evaluateScalableParam } from '../behaviors/util'
import type { Enemy } from './Enemy'

export class Projectile extends Phaser.GameObjects.Graphics {
  private weaponConfig: PlayerWeapon
  private lastHitEnemy: Enemy | null

  constructor(scene: Phaser.Scene) {
    super(scene)
    this.lastHitEnemy = null
    this.weaponConfig = {
      type: 'pistol',
      level: 0,
      fireTimer: 0,
    }
    scene.physics.add.existing(this)
    scene.add.existing(this)
  }

  public spawn(weaponConfig: PlayerWeapon, x: number, y: number, rotation: number) {
    // Restore to scene
    this.setActive(true)
    this.setVisible(true)
    this.getPhysicsBody().enable = true

    this.weaponConfig = weaponConfig
    const physics = this.getPhysicsBody()

    const wpn = WEAPONS[weaponConfig.type]

    this.clear()
    this.fillStyle(wpn.projectileColor, 1)
    const radius = evaluateScalableParam(wpn.projectileRadius, weaponConfig.level)
    switch (wpn.projectileShape) {
      case 'square':
        this.fillRect(0, 0, radius, radius)
        break
      case 'triangle':
        this.fillTriangle(-0.5 * radius, 0, 0.5 * radius, 0, 0, radius)
        break
      case 'circle':
      default:
        this.fillCircle(0, 0, radius)
        break
    }

    physics.setCircle(radius)
    this.setPosition(x, y)
    this.setRotation(rotation)

    for (const behavior of wpn.behaviors) {
      behavior.onSpawn?.(this)
    }
  }

  public update(dt: number) {
    for (const behavior of WEAPONS[this.weaponConfig.type].behaviors) {
      behavior.onUpdate?.(this, dt)
    }
  }

  public despawn() {
    for (const behavior of WEAPONS[this.weaponConfig.type].behaviors) {
      behavior.onDeath?.(this)
    }

    this.getPhysicsBody().setVelocity(0, 0)

    // Remove from scene
    this.setActive(false)
    this.setVisible(false)
    this.getPhysicsBody().enable = false

    this.lastHitEnemy = null
  }

  public hitEnemy(enemy: Enemy) {
    if (enemy === this.lastHitEnemy) {
      return
    }

    this.lastHitEnemy = enemy

    for (const behavior of WEAPONS[this.weaponConfig.type].behaviors) {
      behavior.onHitEnemy?.(this, enemy)
    }
  }

  public getPhysicsBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }

  public getLevel() {
    return this.weaponConfig.level
  }
}
