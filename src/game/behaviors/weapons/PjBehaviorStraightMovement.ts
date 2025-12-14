import type { Projectile } from '@/game/entities/Projectile'
import { evaluateScalableParam } from '../util'
import type { EntityBehavior } from './types'

interface PjBehaviorStraightMovementProps {
  speed: number | ((level: number) => number)
}

export class PjBehaviorStraightMovement implements EntityBehavior<Projectile> {
  private props: PjBehaviorStraightMovementProps
  public constructor(props: PjBehaviorStraightMovementProps) {
    this.props = props
  }
  public onSpawn(projectile: Projectile): void {
    const speed = evaluateScalableParam(this.props.speed, projectile.getLevel())
    const velocity = new Phaser.Math.Vector2()
    velocity.setToPolar(projectile.rotation, speed)
    projectile.getPhysicsBody().setVelocity(velocity.x, velocity.y)
  }
}
