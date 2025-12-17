import type { GameEventType, GameEventMap } from './GameEventBus'

/**
 * Type-safe wrapper for emitting game events from within Phaser
 * Ensures event name and data structure match the GameEventMap
 *
 * @example
 * emitGameEvent(this.scene.events, 'player-health-changed', {
 *   health: this.health,
 *   maxHealth: this.maxHealth
 * })
 */
export function emitGameEvent<T extends GameEventType>(
  emitter: Phaser.Events.EventEmitter,
  event: T,
  data: GameEventMap[T]
): void {
  emitter.emit(event, data)
}
