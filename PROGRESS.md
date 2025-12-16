# Geometry Survivors - Development Progress

## Project Status

**Current Phase:** Evening 1 - Core Game Loop
**Last Updated:** 2025-12-15
**Status:** Combat system complete, ready for XP/leveling

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
- [x] Single enemy type: "Chaser" (triangle, moves toward player)
- [x] Enemy spawning system with wave-based configuration
- [x] Collision detection (player-enemy, projectile-enemy)
- [x] Enemy dies at 0 HP
- [ ] XP orb drop on enemy death
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

1. Implement XP orb drop system on enemy death
2. Add XP orb collection and player leveling
3. Implement basic HUD (health, XP bar, level, kills, time)
4. Add player-enemy collision damage
5. Implement game over state when player health reaches 0

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
- ✅ Converted projectiles from Graphics to Sprite (entity-splat.png default)
- ✅ Projectiles use tinting and scale matching pattern

**Session 3 Completed (2025-12-14):**

- ✅ Created GameEntity base class for shared Projectile/Enemy logic
- ✅ Implemented IDamageable and IAggressor interfaces
- ✅ Created Enemy entity class with health tracking
- ✅ Implemented wave-based spawn system (SpawnManager)
- ✅ Converted Player to extend GameEntity
- ✅ Created EnBehaviorChase (enemy chase AI)
- ✅ Implemented projectile-enemy collision with damage system
- ✅ Created PjBehaviorDieOnHit for projectile despawning
- ✅ Fixed projectile culling to use camera.worldView coordinates

**Key Files Created:**

- `src/game/GameCanvas.tsx` - Phaser game initialization
- `src/game/scenes/GameplayScene.tsx` - Main game scene with entity pooling and collision
- `src/game/entities/GameEntity.ts` - Base class for all poolable entities
- `src/game/entities/Player.ts` - Player with WASD movement, rotation, weapon firing
- `src/game/entities/Projectile.ts` - Poolable projectile with behavior system
- `src/game/entities/Enemy.ts` - Enemy entity with health and AI behaviors
- `src/game/systems/SpawnManager.ts` - Wave-based enemy spawning system
- `src/game/behaviors/weapons/PjBehaviorStraightMovement.ts` - Projectile movement
- `src/game/behaviors/weapons/PjBehaviorDieOnHit.ts` - Projectile damage and despawn
- `src/game/behaviors/weapons/PjBehaviorOffScreenCull.ts` - Spatial culling
- `src/game/behaviors/enemies/EnBehaviorChase.ts` - Enemy chase AI
- `src/game/behaviors/util.ts` - Level-scaling parameter evaluation
- `src/game/interfaces/IDamageable.ts` - Damage system interface
- `src/config/weapons.ts` - Weapon definitions and types
- `src/config/enemies.ts` - Enemy definitions (Chaser config)
- `src/config/waves.ts` - Wave-based spawn configuration
- `src/config/constants.ts` - Base resolution (800x600)
- `src/config/tweaks.ts` - Balance values (player speed, radius, etc.)

**Technical Decisions:**

- Using yarn (not npm)
- RESIZE scale mode with camera zoom for consistent FOV
- Velocity-based movement (not direct position manipulation)
- Unused parameters prefixed with `_` and named for clarity
- Config files for all tweakable values

**Entity System Architecture:**

- **GameEntity Base Class:**
  - Unified architecture for Player, Projectile, Enemy
  - Handles spawn/despawn lifecycle with pooling
  - Manages physics body setup (texture scaling, circular collision)
  - ID generation: `constructor.name-${counter}` pattern
  - Module-level lookup tables for entity access by ID

- **Damage System:**
  - `IDamageable` interface: `doDamage(amount, source)`
  - `IAggressor` interface: tracks target entity type
  - Type guard pattern: `entity.isDamageable()`
  - Enemies track health and handle death on 0 HP

- **Behavior System:**
  - Generic `EntityBehavior<TEntity>` interface
  - Hooks: `onSpawn`, `onUpdate`, `onHitOther`, `onDespawn`
  - Projectile behaviors: `PjBehavior*` prefix
  - Enemy behaviors: `EnBehavior*` prefix
  - Composition over inheritance - mix and match behaviors

**Weapon System Architecture:**

- **Player Weapon Array:** Player owns `PlayerWeapon[]` - can stack multiple weapons
  - Each weapon has: `{ config: WeaponConfig, level: number, fireTimer: number }`
  - Starting weapons defined in config array

- **Infinite Scaling via Functions:**
  - Behavior params can be static values OR functions: `(level: number) => value`
  - Allows per-stat scaling: linear, exponential, stepped, capped, etc.

- **Implemented Projectile Behaviors:**
  - `PjBehaviorStraightMovement` - constant velocity in direction
  - `PjBehaviorDieOnHit` - deal damage and despawn on enemy collision
  - `PjBehaviorOffScreenCull` - camera-relative culling with squared distance

**Spawn System Architecture:**

- **SpawnManager:** Wave-based enemy spawning
  - Wave config defines enemy types, counts, and delays
  - Spawns at random angles around camera at 0.6x viewport distance
  - Loops last wave infinitely for endless mode
  - Data-driven configuration in `waves.ts`

- **Enemy Behaviors:**
  - `EnBehaviorChase` - chase player with level-scaled speed
  - Future: Orbiter, Tank, etc.

**Performance:**

- Physics group pooling for all entities
- Squared distance checks (avoids sqrt)
- Minimal GC pressure via object reuse
