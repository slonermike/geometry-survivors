export default {
  difficulty: {
    playerSpeed: 200,
  },
  player: {
    radius: 20,
    color: 0x00ff00,
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
  maxProjectiles: 200,
} as const
