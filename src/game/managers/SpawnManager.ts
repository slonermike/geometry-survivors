import { type EnemyType } from '@/config/enemies'
import type { GameEntity, SpawnTransform } from '../entities/GameEntity'
import { Enemy } from '../entities/Enemy'
import type { SpawnWave } from '@/config/waves'

let idCounter = 0

export class SpawnManager {
  private scene: Phaser.Scene
  private waves: SpawnWave[]
  private waveNumber: number
  private nextSpawnTime: number | null
  private enemyPool: Phaser.Physics.Arcade.Group

  constructor(scene: Phaser.Scene, waves: SpawnWave[], enemyPool: Phaser.Physics.Arcade.Group) {
    this.waves = waves
    this.waveNumber = 0
    this.nextSpawnTime = null
    this.enemyPool = enemyPool
    this.scene = scene
  }

  getRandomSpawnPosition(): SpawnTransform {
    const distance =
      Math.max(this.scene.cameras.main.worldView.width, this.scene.cameras.main.worldView.height) *
      0.6
    const offset = new Phaser.Math.Vector2()
    offset.setToPolar(Math.random() * Math.PI * 2, distance)
    return {
      x: this.scene.cameras.main.worldView.centerX + offset.x,
      y: this.scene.cameras.main.worldView.centerY + offset.y,
      rotation: 0,
    }
  }

  update(t: number, _dt: number) {
    if (this.waveNumber >= this.waves.length) {
      console.error('Trying to start a wave beyond our max.')
      this.waveNumber = this.waves.length - 1
    }

    if (this.nextSpawnTime === null) this.nextSpawnTime = t

    if (t >= this.nextSpawnTime) {
      const wave = this.waves[this.waveNumber]

      Object.entries(wave.enemies).forEach(([key, count]) => {
        const type = key as EnemyType
        for (let i = 0; i < count; i++) {
          this.createEnemy(
            this.getRandomSpawnPosition(),
            type,
            0 // TODO: assign level.
          )
        }
      })

      let nextWaveIndex = this.waveNumber + 1
      if (nextWaveIndex >= this.waves.length) {
        nextWaveIndex = this.waveNumber
      }

      const nextWave = this.waves[nextWaveIndex]
      if (nextWave) {
        this.nextSpawnTime += nextWave.delayMs
      }

      this.waveNumber = nextWaveIndex
    }
  }

  createEnemy(transform: SpawnTransform, type: EnemyType, level: number) {
    const enemy = this.enemyPool.get() as Enemy
    if (!enemy) {
      return
    }

    const despawnCallback = (e: GameEntity) => {
      if (!(e instanceof Enemy)) {
        console.error(`Non-enemy calling enemy despawn callback.`)
        return
      }
      this.enemyPool.add(e)
    }

    enemy.spawn({
      transform,
      level,
      spawnNumber: idCounter++,
      type: type,
      despawnCallback,
    })
    console.log(`Spawned enemy `)
  }
}
