import type { Enemy } from '@/game/entities/Enemy'
import type { Projectile } from '@/game/entities/Projectile'
import type { DisplayString } from '@/types'

// ============================================================================
// Behavior System Types
// ============================================================================

export interface ProjectileBehavior {
  onSpawn?(projectile: Projectile): void
  onUpdate?(projectile: Projectile, dt: number): void
  onHitEnemy?(projectile: Projectile, enemy: Enemy): void
  onDeath?(projectile: Projectile): void
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
  behaviors: ProjectileBehavior[]
}
