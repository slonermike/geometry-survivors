import type { Enemy } from '@/game/entities/Enemy'
import type { Projectile } from '@/game/entities/Projectile'
import type { DisplayString } from '@/types'

export interface EnemyBehavior {
  onSpawn?: (enemy: Enemy) => void
  onUpdate?: (enemy: Enemy, dt: number) => void
  onDamaged?: (enemy: Enemy, damage: number, source?: Projectile) => void
  onDeath?: (enemy: Enemy, source?: Projectile) => void
}

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
  behaviors: EnemyBehavior[]
}
