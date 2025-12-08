# Geometry Survivors - Development Progress

## Project Status

**Current Phase:** Evening 1 - Core Game Loop
**Last Updated:** 2025-12-07
**Status:** Setup complete, ready to begin implementation

---

## Development Roadmap

### Evening 1: Core Game Loop (4 hours)

**Goal:** Playable game with basic mechanics

- [ ] Phaser game canvas embedded in React app
- [ ] Camera zoom scaling (RESIZE mode with proportional zoom based on 800x600 base resolution)
- [ ] Player sprite (simple circle) with WASD movement
- [ ] Auto-shooting projectiles (fires forward every 1 second)
- [ ] Single enemy type: "Chaser" (triangle, moves toward player)
- [ ] Enemy spawning every 2 seconds at random edge positions
- [ ] Collision detection (player-enemy, projectile-enemy)
- [ ] Enemy dies at 0 HP, drops XP orb
- [ ] Player collects XP, levels up at thresholds
- [ ] Basic HUD showing health, XP bar, level, kills, time
- [ ] Game over when player health reaches 0

**Unit Tests:**

- [ ] XP threshold calculation function
- [ ] Collision detection helpers (if extracted)

---

### Evening 2: Progression System (4 hours)

**Goal:** Upgrade system with meaningful choices

- [ ] Level up pauses game, shows upgrade menu
- [ ] Upgrade selection UI (3 random upgrades presented)
- [ ] Apply upgrade effects to player stats/abilities
- [ ] GameBridge batched updates working correctly
- [ ] Multiple upgrade tiers unlocked by level

**Unit Tests:**

- [ ] GameBridge batching logic (batches updates, flushes on critical events)
- [ ] Upgrade effects calculation (stacking, max limits)
- [ ] Upgrade selection algorithm (filter by tier/level, random selection)

---

### Evening 3: Enemy Variety + Polish (3 hours)

**Goal:** Multiple enemy types and satisfying juice

- [ ] Enemy Type 2: "Orbiter" (square, circles player at distance)
- [ ] Enemy Type 3: "Tank" (large circle, slow, high HP)
- [ ] Spawn scaling over time
- [ ] Screen shake, particles, damage flash
- [ ] XP orbs magnetize toward player
- [ ] Pause menu and main menu screens

**Unit Tests:**

- [ ] Spawn system (correct enemies at correct times/rates)
- [ ] Enemy behavior calculations (orbit positioning, etc.)

---

### Stretch Goals

**Visual Polish:**

- [ ] Animated background grid (color shifting/pulsing)
- [ ] Custom shaders for advanced effects

**Gameplay:**

- [ ] Additional enemy types beyond the core 3
- [ ] More upgrade tiers and combinations
- [ ] Boss encounters

**Performance:**

- [ ] Object pooling optimizations
- [ ] Particle system optimizations

---

## Completed Setup

✅ Vite + React + TypeScript project initialized
✅ Dependencies installed (Phaser, Redux Toolkit, React-Redux)
✅ ESLint configured with exhaustive-deps enforcement
✅ Prettier configured
✅ Pre-commit hooks set up with lint-staged
✅ README updated
✅ Vitest and Testing Library installed

---

## Current Next Steps

1. Create `src/game/entities/Projectile.ts` entity class
2. Add physics group for projectiles in GameplayScene
3. Implement auto-fire timer in Player class
4. Create Enemy (Chaser) entity class
5. Implement spawn system

---

## Architecture Notes

### Two-Tier State Management

**Tier 1 - Phaser Game State (60fps):**

- Entity positions, velocities, collision data
- Direct JavaScript manipulation
- NO Redux at this layer

**Tier 2 - Redux Application State (~10fps):**

- Player stats (health, XP, level, kills)
- UI state (pause, upgrade menus)
- Batched updates every 100ms via GameBridge

### Key Technical Patterns

- **Object Pooling:** Physics groups handle entity reuse automatically
- **Batched Redux Updates:** GameBridge prevents 60fps Redux dispatches
- **Data-Driven Design:** Configs for enemies/upgrades, not hardcoded values
- **Separation of Concerns:** Game logic in Phaser, UI logic in React
- **Test-Driven for Core Logic:** Pure functions tested with Vitest
- **Responsive Scaling:** RESIZE mode with camera zoom maintains consistent field of view across resolutions (base: 800x600)

### Testing Strategy

Focus on **algorithmic and business logic:**

- XP thresholds (mathematical progression)
- Upgrade calculations (stacking, multipliers)
- GameBridge batching (timing, immediate vs deferred)
- Spawn scheduling (time-based enemy waves)

**Not testing:**

- Phaser internals (collision, physics)
- UI component rendering (focus on logic)

---

## Session Notes

### Session 1 (2025-12-07)

**Completed:**

- ✅ Project setup with Vite + React + TypeScript
- ✅ Installed dependencies: Phaser, Redux Toolkit, React-Redux, Vitest
- ✅ Configured ESLint with exhaustive-deps (using flat config: `eslint.config.js`)
- ✅ Configured Prettier with pre-commit hooks via husky + lint-staged
- ✅ Set up path aliases (`@/` = `src/`)
- ✅ Created project folder structure
- ✅ Implemented GameCanvas component (Phaser embedded in React)
- ✅ Implemented GameplayScene with camera zoom scaling
- ✅ Implemented Player entity with WASD movement
- ✅ Added background grid for visual reference

**In Progress:**

- 🔄 Auto-shooting projectiles system (next: create Projectile entity)

**Key Files Created:**

- `src/game/GameCanvas.tsx` - Phaser game initialization
- `src/game/scenes/GameplayScene.tsx` - Main game scene
- `src/game/entities/Player.ts` - Player with velocity-based movement
- `src/config/constants.ts` - Base resolution (800x600)
- `src/config/tweaks.ts` - Balance values (player speed, radius, etc.)

**Technical Decisions:**

- Using yarn (not npm)
- RESIZE scale mode with camera zoom for consistent FOV
- Velocity-based movement (not direct position manipulation)
- Unused parameters prefixed with `_` and named for clarity
- Config files for all tweakable values

**Next Session:**

1. Create Projectile entity class
2. Set up physics group with object pooling
3. Add auto-fire timer to Player
4. Then move on to Enemy (Chaser) implementation
