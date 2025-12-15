export interface SpawnTransform {
  x: number
  y: number
  rotation: number
}

export type EntityDespawnCallback = ((entity: GameEntity) => void) | null
export type EntityId = `${string}-${number}`

export interface SpawnProps {
  spawnNumber: number
  transform: SpawnTransform
  despawnCallback?: EntityDespawnCallback
}

export abstract class GameEntity extends Phaser.GameObjects.Sprite {
  protected despawnCallback: EntityDespawnCallback
  protected id!: EntityId
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'entity-hex')
    this.despawnCallback = null
    scene.physics.add.existing(this)
    scene.add.existing(this)
    this.id = 'Nil-0'
  }

  protected spawnBase(
    { spawnNumber, transform, despawnCallback }: SpawnProps,
    texture: string,
    color: number,
    radius: number
  ) {
    this.id = `${this.constructor.name}-${spawnNumber}`
    this.setActive(true)
    this.setVisible(true)
    this.getPhysicsBody().enable = true

    this.setTexture(texture)
    this.setTint(color)

    const scale = (radius * 2) / this.width
    this.setScale(scale)

    const physics = this.getPhysicsBody()
    physics.setCircle(radius / scale)
    physics.setOffset(radius, radius)

    this.setPosition(transform.x, transform.y)
    this.setRotation(transform.rotation)

    this.despawnCallback = despawnCallback ?? null
  }

  public despawn() {
    if (!this.active) return

    this.getPhysicsBody().setVelocity(0, 0)
    this.setActive(false)
    this.setVisible(false)
    this.getPhysicsBody().enable = false

    this.despawnCallback?.(this)
    this.despawnCallback = null
  }

  public getPhysicsBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }
}
