import type { GameEntity } from './GameEntity'

export interface IAggressor {
  getNearestTarget: () => GameEntity | null
  hitOther: (target: GameEntity) => void
  // TODO: a version that considers view cones.
}
