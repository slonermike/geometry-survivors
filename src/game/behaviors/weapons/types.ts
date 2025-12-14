import type { GameEntity } from '@/game/entities/GameEntity'
import type { Projectile } from '@/game/entities/Projectile'
import type { DisplayString } from '@/types'

// ============================================================================
// Behavior System Types
// ============================================================================

export interface EntityBehavior<TEntity extends GameEntity> {
  onSpawn?(entity: TEntity): void
  onUpdate?(entity: TEntity, dt: number): void
  onHitOther?(entity: TEntity, other: GameEntity): void
  onDespawn?(entity: TEntity): void
}

// ============================================================================
// Weapon Config Types
// ============================================================================

export interface WeaponConfig {
  name: DisplayString
  description: DisplayString

  // Firing
  fireCooldown: number | ((level: number) => number) // ms between shots

  // Visuals
  projectileRadius: number | ((level: number) => number)
  projectileColor: number
  projectileShape: 'circle' | 'square' | 'triangle'

  // Behaviors define all projectile logic
  behaviors: EntityBehavior<Projectile>[]
}
