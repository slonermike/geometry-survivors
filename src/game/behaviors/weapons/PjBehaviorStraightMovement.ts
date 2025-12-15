import type { Projectile } from '@/game/entities/Projectile'
import { evaluateScalableParam, type ScalableParam } from '../util'
import type { EntityBehavior } from './types'

interface PjBehaviorStraightMovementProps {
  speed: ScalableParam<number>
}

export class PjBehaviorStraightMovement implements EntityBehavior<Projectile> {
  private props: PjBehaviorStraightMovementProps
  public constructor(props: PjBehaviorStraightMovementProps) {
    this.props = props
  }
  public onSpawn(pj: Projectile): void {
    const speed = evaluateScalableParam(this.props.speed, pj)
    const velocity = new Phaser.Math.Vector2()
    velocity.setToPolar(pj.rotation, speed)
    pj.getPhysicsBody().setVelocity(velocity.x, velocity.y)
  }
}
