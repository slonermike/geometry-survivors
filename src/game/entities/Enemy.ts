import { ENEMIES, type EnemyType } from '@/config/enemies'
import { evaluateScalableParam } from '../behaviors/util'
import type { Player } from './Player'

export type EnemyId = string

const enemyTable: Record<EnemyId, Enemy> = {}

export function getEnemy(id: EnemyId): Enemy | undefined {
  return enemyTable[id]
}

interface Props {
  id: string
  x: number
  y: number
  rotation: number
  type: EnemyType
  level: number
  despawnCallback?: EnemyDespawnCallback
}

type EnemyDespawnCallback = (en: Enemy) => void

export class Enemy extends Phaser.GameObjects.Sprite {
  private despawnCallback: EnemyDespawnCallback | null
  private enemyType: EnemyType
  private level: number
  private id: string

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'entity-hex')
    this.enemyType = 'chaser'
    this.level = 0
    this.despawnCallback = null
    this.id = '[pre-spawn]'
    scene.physics.add.existing(this)
    scene.add.existing(this)
  }

  public getPhysicsBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }

  public spawn(props: Props) {
    this.setActive(true)
    this.setVisible(true)
    this.getPhysicsBody().enable = true
    this.id = props.id
    enemyTable[this.id] = this

    this.despawnCallback = props.despawnCallback ?? null

    this.enemyType = props.type
    this.level = props.level

    const enProps = ENEMIES[this.enemyType]
    const physics = this.getPhysicsBody()

    this.setTexture(enProps.texture)
    this.setTint(evaluateScalableParam(enProps.color, this.level))

    const radius = enProps.radius
    const scale = (radius * 2) / this.width
    this.setScale(scale)

    physics.setCircle(radius / scale)
    physics.setOffset(radius, radius)

    this.setPosition(props.x, props.y)
    this.setRotation(props.rotation)

    for (const behavior of enProps.behaviors) {
      behavior.onSpawn?.(this)
    }
  }

  public update(dt: number) {
    for (const behavior of ENEMIES[this.enemyType].behaviors) {
      behavior.onUpdate?.(this, dt)
    }
  }

  public despawn() {
    if (!this.active) {
      return
    }

    for (const behavior of ENEMIES[this.enemyType].behaviors) {
      behavior.onDeath?.(this)
    }

    delete enemyTable[this.id]

    this.getPhysicsBody().setVelocity(0, 0)

    // Remove from scene
    this.setActive(false)
    this.setVisible(false)
    this.getPhysicsBody().enable = false

    this.despawnCallback?.(this)
    this.despawnCallback = null
  }

  /**
   * TODO...
   * Do we do this per frame or per overlap start?
   * Probably per frame, scaled by dt...
   * @param player
   */
  public overlapPlayer(_player: Player) {}
}
