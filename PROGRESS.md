# Geometry Survivors - Development Progress

## Project Status

**Current Phase:** Evening 1 - Core Game Loop
**Last Updated:** 2025-12-09
**Status:** Projectiles working, ready for enemies

---

## Development Roadmap

### Evening 1: Core Game Loop (4 hours)

**Goal:** Playable game with basic mechanics

- [x] Phaser game canvas embedded in React app
- [x] Camera zoom scaling (RESIZE mode with proportional zoom based on 800x600 base resolution)
- [x] Player sprite with WASD movement
- [x] Player texture with tinting and bloom effects
- [x] Auto-shooting projectiles with composition-based behaviors
- [x] Projectile spatial culling (off-screen despawn)
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

1. Add textures to projectiles (switch from Graphics to Sprite)
2. Create Enemy (Chaser) entity class
3. Implement enemy spawning system
4. Set up collision detection (projectile-enemy, player-enemy overlap)
5. Implement ApplyDamage and DieOnHit behaviors

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

**Session 1 Completed (2025-12-07):**

- ✅ Auto-shooting projectiles system working
- ✅ Composition-based behavior system implemented
- ✅ Object pooling with Phaser physics groups
- ✅ Player rotates to face movement direction
- ✅ Weapons fire on cooldown with level scaling

**Session 2 Completed (2025-12-09):**

- ✅ Entity textures (player uses entity-swirl.png)
- ✅ Sprite scaling system (calculates scale from texture size to match config)
- ✅ Physics body scale-space handling (texture-space vs world-space)
- ✅ Bloom post-processing effect on camera
- ✅ Projectile spatial culling with squared distance optimization

**Key Files Created:**

- `src/game/GameCanvas.tsx` - Phaser game initialization
- `src/game/scenes/GameplayScene.tsx` - Main game scene with projectile pooling
- `src/game/entities/Player.ts` - Player with WASD movement, rotation, weapon firing
- `src/game/entities/Projectile.ts` - Poolable projectile with behavior system
- `src/game/behaviors/weapons/StraightMovement.ts` - Projectile movement behavior
- `src/game/behaviors/util.ts` - Level-scaling parameter evaluation
- `src/config/weapons.ts` - Weapon definitions and types
- `src/config/constants.ts` - Base resolution (800x600)
- `src/config/tweaks.ts` - Balance values (player speed, radius, etc.)

**Technical Decisions:**

- Using yarn (not npm)
- RESIZE scale mode with camera zoom for consistent FOV
- Velocity-based movement (not direct position manipulation)
- Unused parameters prefixed with `_` and named for clarity
- Config files for all tweakable values

**Weapon System Architecture:**

- **Player Weapon Array:** Player owns `PlayerWeapon[]` - can stack multiple weapons like Vampire Survivors
  - Each weapon has: `{ config: WeaponConfig, level: number, fireTimer: number }`
  - No max weapon count (can add limit later)
  - Starting weapons defined in config array

- **Composition-Based Behaviors:**
  - Projectile behaviors defined in weapon config (movement, collision, effects)
  - Behaviors implement optional hooks: `onSpawn`, `onUpdate`, `onHitEnemy`, `onDeath`
  - No complex behavior communication - designer chooses compatible behaviors
  - Projectile references weapon instance (doesn't copy behaviors)

- **Infinite Scaling via Functions:**
  - Behavior params can be static values OR functions: `(level: number) => value`
  - Allows per-stat scaling: linear, exponential, stepped, capped, etc.
  - Examples:
    - `damage: (level) => 10 * Math.pow(1.15, level)` - exponential
    - `pierce: (level) => Math.floor(level / 3)` - unlock at levels 3, 6, 9...
    - `speed: 300` - never scales

- **Core Projectile Behaviors (Session 1):**
  - `StraightMovement` - constant velocity in direction
  - `DieOnHit` - kill projectile on enemy collision (tracks `lastHitEnemy` for O(1) lookup)
  - `OffScreenCull` - camera-relative culling at full viewport distance
  - `ApplyDamage` - deal damage to enemy on hit

- **Future Features (Later Sessions):**
  - Firing patterns: burst fire, charge shots, irregular timing
  - Advanced behaviors: Pierce, Homing, Explode, Chain, SineWave, TimeToLive
  - Non-projectile powers: auras (garlic), orbitals, zones

- **Performance:**
  - Physics group pooling for projectile reuse
  - Single `lastHitEnemy` reference (not Set) - O(1) vs O(n)
  - Edge case acceptable: projectile A→B→A may re-damage A

**Next Steps (Session 3):**

1. Add textures to projectiles
2. Create Enemy (Chaser) entity class
3. Implement enemy spawning system
4. Set up collision detection (projectile-enemy overlap)
5. Implement remaining projectile behaviors:
   - ApplyDamage (deal damage on hit)
   - DieOnHit (despawn after hitting enemy)
6. XP orb drop system
7. XP collection and leveling
8. Basic HUD (health, XP bar, level, kills, time)
9. Game over state
