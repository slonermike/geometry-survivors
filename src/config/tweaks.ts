export default {
  difficulty: {
    playerSpeed: 200,
  },
  player: {
    radius: 20,
    color: 0x00ccff,
  },
  baseResolution: {
    width: 800,
    height: 600,
  },
  grid: {
    spacingMajor: 1000,
    spacingMinor: 100,
    color: 0xffffff,
    majorAlpha: 0.8,
    minorAlpha: 0.1,
    extents: 2000,
  },
  projectiles: {
    maxCount: 200,
    maxScreenDistance: 1.5,
  },
  debug: {
    physics: false,
  },
  rendering: {
    bloom: {
      color: 0xffffff,
      offsetX: 1,
      offsetY: 1,
      blurStrength: 1.5,
      bloomStrength: 1.5,
      steps: 4,
    },
  },
} as const
