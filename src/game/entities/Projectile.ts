import { WEAPON_PROPERTIES } from '@/config/weapons'
import type { PlayerWeapon } from './Player'
import { evaluateScalableParam } from '../behaviors/util'
import { Enemy } from './Enemy'
import tweaks from '@/config/tweaks'
import { GameEntity, type EntityDespawnCallback, type SpawnTransform } from './GameEntity'

export class Projectile extends GameEntity {
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
    despawnCallback: EntityDespawnCallback,
    transform: SpawnTransform
  ) {
    const wpn = WEAPON_PROPERTIES[weaponConfig.type]
    this.spawnBase(
      transform,
      'entity-splat', // TODO
      evaluateScalableParam(wpn.projectileColor, weaponConfig.level),
      evaluateScalableParam(wpn.projectileRadius, weaponConfig.level),
      despawnCallback
    )
    this.weaponConfig = weaponConfig

    for (const behavior of wpn.behaviors) {
      behavior.onSpawn?.(this)
    }
  }

  public update(dt: number) {
    for (const behavior of WEAPON_PROPERTIES[this.weaponConfig.type].behaviors) {
      behavior.onUpdate?.(this, dt)
    }
    this.handleSpatialDespawn()
  }

  public handleSpatialDespawn() {
    const camera = this.scene.cameras.main
    const cameraWorldSize = Math.max(camera.width, camera.height) / camera.zoom
    const maxDist = cameraWorldSize * tweaks.projectiles.maxScreenDistance
    const distFromCameraSq = Phaser.Math.Distance.BetweenPointsSquared(
      { x: camera.worldView.centerX, y: camera.worldView.centerY },
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

    for (const behavior of WEAPON_PROPERTIES[this.weaponConfig.type].behaviors) {
      behavior.onDespawn?.(this)
    }

    this.lastHitEnemy = null

    super.despawn()
  }

  public hitOther(entity: GameEntity) {
    if (entity === this.lastHitEnemy) {
      return
    }

    if (entity instanceof Enemy) {
      this.lastHitEnemy = entity
    }

    for (const behavior of WEAPON_PROPERTIES[this.weaponConfig.type].behaviors) {
      behavior.onHitOther?.(this, entity)
    }
  }

  public getLevel() {
    return this.weaponConfig.level
  }
}
