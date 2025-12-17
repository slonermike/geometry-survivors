import type { GameEventBus, GameEventType, GameEventCallback } from './GameEventBus'

/**
 * Concrete implementation of GameEventBus that wraps Phaser's EventEmitter
 */
export class PhaserEventBus implements GameEventBus {
  private eventEmitter: Phaser.Events.EventEmitter

  constructor(eventEmitter: Phaser.Events.EventEmitter) {
    this.eventEmitter = eventEmitter
  }

  on<T extends GameEventType>(event: T, callback: GameEventCallback<T>): void {
    this.eventEmitter.on(event, callback)
  }

  off<T extends GameEventType>(event: T, callback: GameEventCallback<T>): void {
    this.eventEmitter.off(event, callback)
  }
}
