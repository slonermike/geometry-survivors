// ============================================================================
// Enemy Type Definitions
// ============================================================================

import type { EnemyConfig } from '@/game/behaviors/enemies/types'

export type EnemyType = 'chaser'

// ============================================================================
// Enemy Definitions
// ============================================================================

export const ENEMIES: Record<EnemyType, EnemyConfig> = {
  chaser: {
    name: 'Chaser',
    maxHealth: (level) => 10 + level * 5,
    speed: 100,
    damage: 10,
    xpDrop: (level) => 5 + level * 2,
    texture: 'entity-hex',
    color: (level) => {
      // Shift from red to brighter/yellower as level increases
      const r = 0xff
      const g = Math.min(0x33 + level * 0x10, 0xff)
      const b = 0x33
      return (r << 16) | (g << 8) | b
    },
    radius: 15,
    behaviors: [], // Will add EnemyBehaviorChase after we define the interface
    levelBounds: {
      min: 0,
      max: 5,
    },
  },
}
