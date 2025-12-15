import Phaser from 'phaser'
import tweaks from '../../config/tweaks'
import { STARTING_WEAPONS, WEAPON_PROPERTIES, type WeaponType } from '@/config/weapons'
import type { GameplayScene } from '../scenes/GameplayScene'
import { Projectile } from './Projectile'
import { evaluateScalableParam } from '../behaviors/util'
import { GameEntity } from './GameEntity'

let pjIdCounter = 0
let playerIdCounter = 0

export interface PlayerWeapon {
  type: WeaponType
  level: number
  fireTimer: number
}

export class Player extends GameEntity {
  private speedMultiplier = 1.0
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  private projectilePool: Phaser.Physics.Arcade.Group
  private weapons: PlayerWeapon[] = []

  constructor(
    scene: GameplayScene,
    projectilePool: Phaser.Physics.Arcade.Group,
    x: number,
    y: number
  ) {
    super(scene)
    this.projectilePool = projectilePool
    this.weapons = STARTING_WEAPONS.map((type) => ({
      type,
      level: 0,
      fireTimer: 0,
    }))
    this.spawnBase(
      {
        spawnNumber: playerIdCounter++,
        transform: {
          x,
          y,
          rotation: 0,
        },
      },
      'entity-swirl',
      tweaks.player.color,
      tweaks.player.radius
    )

    this.cursors = scene.input.keyboard?.createCursorKeys()
  }

  update(dt: number) {
    if (!this.body) {
      throw new Error('Player has no physics body in update')
    }
    const physicsBody = this.body as Phaser.Physics.Arcade.Body

    const velocity = new Phaser.Math.Vector2(
      this.cursors?.left.isDown ? -1 : this.cursors?.right.isDown ? 1 : 0,
      this.cursors?.up.isDown ? -1 : this.cursors?.down.isDown ? 1 : 0
    )
      .normalize()
      .scale(this.speedMultiplier * tweaks.difficulty.playerSpeed)

    physicsBody.setVelocity(velocity.x, velocity.y)

    if (velocity.lengthSq() > 0) {
      this.rotation = velocity.angle()
    }

    this.fireProjectiles(dt)
  }

  fireProjectiles(dt: number) {
    for (const weapon of this.weapons) {
      weapon.fireTimer -= dt
      if (weapon.fireTimer <= 0) {
        this.fireProjectile(weapon)
      }
    }
  }

  fireProjectile(weapon: PlayerWeapon) {
    const projectile = this.projectilePool.get() as Projectile
    if (!projectile) {
      return
    }

    const despawnCallback = (e: GameEntity) => {
      if (!(e instanceof Projectile)) {
        console.error('Non-projectile trying to despawn back to projectile pool!')
        return
      }
      this.projectilePool.add(e)
    }

    projectile.spawn({
      spawnNumber: pjIdCounter++,
      weaponConfig: weapon,
      transform: {
        x: this.x,
        y: this.y,
        rotation: this.rotation,
      },
      despawnCallback,
    })
    const weaponInfo = WEAPON_PROPERTIES[weapon.type]
    weapon.fireTimer = evaluateScalableParam(weaponInfo.fireCooldown, weapon.level)
  }
}
