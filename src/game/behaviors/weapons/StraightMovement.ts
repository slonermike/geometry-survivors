import type { Projectile } from '@/game/entities/Projectile'
import { evaluateScalableParam } from '../util'
import type { ProjectileBehavior } from './types'

interface StraightMovementProps {
  speed: number | ((level: number) => number)
}

export class StraightMovement implements ProjectileBehavior {
  private props: StraightMovementProps
  public constructor(props: StraightMovementProps) {
    this.props = props
  }
  public onSpawn(projectile: Projectile): void {
    const speed = evaluateScalableParam(this.props.speed, projectile.getLevel())
    const velocity = new Phaser.Math.Vector2()
    velocity.setToPolar(projectile.rotation, speed)
    projectile.getPhysicsBody().setVelocity(velocity.x, velocity.y)
  }
}
