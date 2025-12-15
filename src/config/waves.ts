import type { EnemyType } from './enemies'

export interface SpawnWave {
  delayMs: number
  enemies: Record<EnemyType, number>
}

export const WAVES: SpawnWave[] = [
  {
    delayMs: 0,
    enemies: {
      chaser: 4,
    },
  },
  {
    delayMs: 5000,
    enemies: {
      chaser: 8,
    },
  },
  {
    delayMs: 5000,
    enemies: {
      chaser: 12,
    },
  },
  {
    delayMs: 5000,
    enemies: {
      chaser: 20,
    },
  },
]
