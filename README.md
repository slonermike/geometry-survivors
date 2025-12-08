# Geometry Survivors

A browser-based survival game built with TypeScript, Phaser 3, React, and Redux Toolkit. Inspired by Vampire Survivors.

## Overview

Control a geometric shape that automatically fires projectiles while being swarmed by enemies. Survive as long as possible, collect XP, level up, and choose upgrades to become more powerful.

## Tech Stack

- **Game Engine:** Phaser 3
- **UI Framework:** React 18 with TypeScript
- **State Management:** Redux Toolkit
- **Build Tool:** Vite
- **Runtime:** Browser (Chrome/Firefox/Safari)

## Development

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Lint code
yarn lint

# Format code
yarn format
```

## Project Structure

```
src/
├── game/          # Phaser game engine code
│   ├── scenes/    # Game scenes (Boot, Menu, Game, GameOver)
│   ├── entities/  # Player, Enemy, Projectile classes
│   ├── systems/   # Spawn system, upgrade application logic
│   └── managers/  # Effects manager (particles, screen shake)
├── ui/            # React components
│   └── components/# HUD, menus, overlays
├── store/         # Redux state management
│   └── slices/    # State slices
├── services/      # GameBridge (Phaser ↔ Redux communication)
├── config/        # Data files (enemies, upgrades, spawn schedules)
└── types/         # Shared TypeScript types
```

## License

MIT
