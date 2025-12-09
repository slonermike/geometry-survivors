import Phaser from 'phaser'
import { useEffect, useRef } from 'react'
import { GameplayScene } from './scenes/GameplayScene'

let game: Phaser.Game | null = null

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    if (containerRef.current.clientWidth === 0 || containerRef.current.clientHeight === 0) {
      console.warn(
        `Client rect size invalid for game container: ${containerRef.current.clientWidth}, ${containerRef.current.clientHeight}`
      )
      return
    }

    if (game) {
      console.warn('Attempting to reinitialize game when it has already been created')
      return
    }

    const config: Phaser.Types.Core.GameConfig = {
      /**
       * I may specify webgl later if I want to do more advanced stuff.
       * Will use WebGL if possible, Canvas otherwise.
       */
      type: Phaser.AUTO,

      scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%',
      },

      parent: containerRef.current,

      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true, // would show collision boxen
        },
      },
      scene: [GameplayScene],
    }
    game = new Phaser.Game(config)

    return () => {
      game?.destroy(true, false)
      game = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
