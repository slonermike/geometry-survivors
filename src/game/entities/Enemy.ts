import { ENEMIES, type EnemyType } from '@/config/enemies'
import { evaluateScalableParam } from '../behaviors/util'
import type { Player } from './Player'
import { GameEntity, type SpawnProps } from './GameEntity'
import type { ILeveledEntity } from './ILeveledEntity'
import type { IAggressor } from './IAggressor'
import { GameplayScene } from '../scenes/GameplayScene'

export type EnemyId = string

const enemyTable: Record<EnemyId, Enemy> = {}

export function getEnemy(id: EnemyId): Enemy | undefined {
  return enemyTable[id]
}

interface Props extends SpawnProps {
  type: EnemyType
  level: number
}

export class Enemy extends GameEntity implements ILeveledEntity, IAggressor {
  private enemyType: EnemyType
  private level: number

  constructor(scene: Phaser.Scene) {
    super(scene)
    this.enemyType = 'chaser'
    this.level = 0
  }

  public getLevel() {
    return this.level
  }

  public spawn(props: Props) {
    this.enemyType = props.type
    this.level = props.level

    const enProps = ENEMIES[this.enemyType]

    enemyTable[this.id] = this

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

  /**
   * TODO...
   * Do we do this per frame or per overlap start?
   * Probably per frame, scaled by dt...
   * @param player
   */
  public overlapPlayer(_player: Player) {}

  public getNearestTarget() {
    if (!(this.scene instanceof GameplayScene)) {
      return null
    }

    return this.scene.getPlayer()
  }
}
