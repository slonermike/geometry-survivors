import { PjBehaviorStraightMovement } from '@/game/behaviors/weapons/PjBehaviorStraightMovement'
import type { WeaponConfig } from '@/game/behaviors/weapons/types'

// ============================================================================
// Weapon Definitions
// ============================================================================
export type WeaponType = 'pistol'
export const WEAPON_PROPERTIES: Record<WeaponType, WeaponConfig> = {
  // TODO: Add pistol weapon config
  pistol: {
    name: 'Pistola',
    description: 'My baby shot me down',
    fireCooldown: 500,
    projectileRadius: 5,
    projectileShape: 'circle',
    projectileColor: 0x00ffff,
    behaviors: [
      new PjBehaviorStraightMovement({
        // TODO: can we memoize these to allow more complexity?
        speed: (level) => 500 + level * 0.2,
      }),
    ],
  },
} as const

// ============================================================================
// Starting Loadout
// ============================================================================

export const STARTING_WEAPONS: WeaponType[] = ['pistol']
