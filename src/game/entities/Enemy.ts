import { ENEMIES, type EnemyType } from '@/config/enemies'
import { evaluateScalableParam } from '../behaviors/util'
import { GameEntity, type SpawnProps } from './GameEntity'
import type { ILeveledEntity } from './ILeveledEntity'
import type { IAggressor } from './IAggressor'
import { GameplayScene } from '../scenes/GameplayScene'
import type { IDamageable } from './IDamageable'

export type EnemyId = string

const enemyTable: Record<EnemyId, Enemy> = {}

export function getEnemy(id: EnemyId): Enemy | undefined {
  return enemyTable[id]
}

interface Props extends SpawnProps {
  type: EnemyType
  level: number
}

export class Enemy extends GameEntity implements ILeveledEntity, IAggressor, IDamageable {
  private enemyType: EnemyType
  private level: number
  private health: number

  constructor(scene: Phaser.Scene) {
    super(scene)
    this.enemyType = 'chaser'
    this.level = 0
    this.health = 0
  }

  public getLevel() {
    return this.level
  }

  public spawn(props: Props) {
    this.enemyType = props.type
    this.level = props.level

    enemyTable[this.id] = this

    const enProps = ENEMIES[this.enemyType]
    this.health = evaluateScalableParam(enProps.maxHealth, this)

    this.spawnBase(
      props,
      enProps.texture,
      evaluateScalableParam(enProps.color, this),
      enProps.radius
    )

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
      behavior.onDespawn?.(this)
    }

    delete enemyTable[this.id]

    super.despawn()
  }

  public getNearestTarget() {
    if (!(this.scene instanceof GameplayScene)) {
      return null
    }

    return this.scene.getPlayer()
  }

  public doDamage(damageAmount: number, _source: IAggressor) {
    this.health = Math.max(0, this.health - damageAmount)
    if (this.health === 0) {
      this.despawn()
    }
  }

  public isDamageable(): this is IDamageable {
    return true
  }

  public hitOther(target: GameEntity) {
    for (const behavior of ENEMIES[this.enemyType].behaviors) {
      behavior.onHitOther?.(this, target)
    }
  }
}
