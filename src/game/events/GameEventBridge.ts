import type { AppDispatch } from '@/store/store'
import { updatePlayerHealth } from '@/store/playerSlice'
import type { GameEventBus, GameEventCallback, GameEventType } from './GameEventBus'

/**
 * Bridge that connects game events to Redux store
 * Subscribes to game events and dispatches corresponding Redux actions
 */
export class GameEventBridge {
  private dispatch: AppDispatch
  private eventBus: GameEventBus | null = null
  private listeners: Map<string, GameEventCallback<GameEventType>> = new Map()

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }

  /**
   * Connect to the game's event bus
   */
  connect(eventBus: GameEventBus) {
    this.eventBus = eventBus
    this.setupListeners()
  }

  /**
   * Disconnect from the game's event bus
   */
  disconnect() {
    if (!this.eventBus) return

    // Remove all listeners
    this.listeners.forEach((callback, event) => {
      this.eventBus!.off(event as GameEventType, callback)
    })
    this.listeners.clear()
    this.eventBus = null
  }

  private setupListeners() {
    if (!this.eventBus) return

    // Player health changed
    const healthCallback: GameEventCallback<'player-health-changed'> = (data) => {
      this.dispatch(updatePlayerHealth(data))
    }
    this.eventBus.on('player-health-changed', healthCallback)
    this.listeners.set('player-health-changed', healthCallback)
  }
}
