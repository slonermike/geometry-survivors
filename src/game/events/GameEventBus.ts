/**
 * Game event types that the UI can subscribe to
 */
export interface GameEventMap {
  'player-health-changed': { health: number; maxHealth: number }
  // Add more events here as needed
}

export type GameEventType = keyof GameEventMap
export type GameEventCallback<T extends GameEventType> = (data: GameEventMap[T]) => void

/**
 * Type-safe wrapper around Phaser's event system
 * Exposes only game events to the UI layer, hiding Phaser internals
 */
export interface GameEventBus {
  on<T extends GameEventType>(event: T, callback: GameEventCallback<T>): void
  off<T extends GameEventType>(event: T, callback: GameEventCallback<T>): void
}
