import { ENEMIES, type EnemyType } from '@/config/enemies'
import { evaluateScalableParam } from '../behaviors/util'
import type { Player } from './Player'
import {
  GameEntity,
  type EntityDespawnCallback,
  type SpawnProps,
  type SpawnTransform,
} from './GameEntity'

export type EnemyId = string

const enemyTable: Record<EnemyId, Enemy> = {}

export function getEnemy(id: EnemyId): Enemy | undefined {
  return enemyTable[id]
}

interface Props extends SpawnProps {
  type: EnemyType
  level: number
}

export class Enemy extends GameEntity {
  private enemyType: EnemyType
  private level: number
  private id: string

  constructor(scene: Phaser.Scene) {
    super(scene)
    this.enemyType = 'chaser'
    this.level = 0
    this.id = '[pre-spawn]'
  }

  public spawn(props: Props, transform: SpawnTransform, despawnCallback: EntityDespawnCallback) {
    this.enemyType = props.type
    this.level = props.level

    const enProps = ENEMIES[this.enemyType]

    this.id = `${enProps.name}:${props.spawnNumber}`
    enemyTable[this.id] = this

    this.spawnBase(
      transform,
      enProps.texture,
      evaluateScalableParam(enProps.color, this.level),
      enProps.radius,
      despawnCallback
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
}
