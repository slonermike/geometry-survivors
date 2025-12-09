import { WEAPONS } from '@/config/weapons'
import type { PlayerWeapon } from './Player'
import { evaluateScalableParam } from '../behaviors/util'
import type { Enemy } from './Enemy'
import tweaks from '@/config/tweaks'

type ProjectileDespawnCallback = (pj: Projectile) => void

export class Projectile extends Phaser.GameObjects.Graphics {
  private weaponConfig: PlayerWeapon
  private despawnCallback: ProjectileDespawnCallback | null
  private lastHitEnemy: Enemy | null

  constructor(scene: Phaser.Scene) {
    super(scene)
    this.despawnCallback = null
    this.lastHitEnemy = null
    this.weaponConfig = {
      type: 'pistol',
      level: 0,
      fireTimer: 0,
    }
    scene.physics.add.existing(this)
    scene.add.existing(this)
  }

  /**
   * Sets up a projectile after it's been allocated from its pool.
   *
   * @param weaponConfig Gives parameters the projectile instance needs to apply its properties
   * @param despawnCallback Callback where the owner handles pooling
   * @param x Spawn Position
   * @param y Spawn Position
   * @param rotation Spawn Rotation
   */
  public spawn(
    weaponConfig: PlayerWeapon,
    despawnCallback: ProjectileDespawnCallback,
    x: number,
    y: number,
    rotation: number
  ) {
    // Restore to scene
    this.setActive(true)
    this.setVisible(true)
    this.getPhysicsBody().enable = true

    this.despawnCallback = despawnCallback

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
    this.handleSpatialDespawn()
  }

  public handleSpatialDespawn() {
    const camera = this.scene.cameras.main
    const cameraWorldSize = Math.max(camera.width, camera.height) / camera.zoom
    const maxDist = cameraWorldSize * tweaks.projectiles.maxScreenDistance
    const distFromCameraSq = Phaser.Math.Distance.BetweenPointsSquared(
      { x: camera.centerX, y: camera.centerY },
      this
    )
    if (distFromCameraSq > maxDist * maxDist) {
      this.despawn()
    }
  }

  /**
   * Shuts down the projectile and returns it to its pool.
   */
  public despawn() {
    if (!this.active) {
      return
    }

    for (const behavior of WEAPONS[this.weaponConfig.type].behaviors) {
      behavior.onDeath?.(this)
    }

    this.getPhysicsBody().setVelocity(0, 0)

    // Remove from scene
    this.setActive(false)
    this.setVisible(false)
    this.getPhysicsBody().enable = false

    this.lastHitEnemy = null

    this.despawnCallback?.(this)
    this.despawnCallback = null
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
