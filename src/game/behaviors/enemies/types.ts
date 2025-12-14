import type { DisplayString } from '@/types'
import type { EntityBehavior } from '../weapons/types'
import type { Enemy } from '@/game/entities/Enemy'

// ============================================================================
// Enemy Config Types
// ============================================================================

export interface EnemyConfig {
  name: DisplayString

  // Stats
  maxHealth: number | ((level: number) => number)
  speed: number | ((level: number) => number)
  damage: number | ((level: number) => number)
  xpDrop: number | ((level: number) => number)
  levelBounds: {
    min: number
    max: number
  }

  // Visuals
  texture: string
  color: number | ((level: number) => number)
  radius: number

  // Behaviors define all enemy logic
  behaviors: EntityBehavior<Enemy>[]
}
