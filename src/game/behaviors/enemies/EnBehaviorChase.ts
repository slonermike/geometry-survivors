import type { Enemy } from '@/game/entities/Enemy'
import { evaluateScalableParam, type ScalableParam } from '../util'
import type { EntityBehavior } from '../weapons/types'

interface EnBehaviorChaseProps {
  speed: ScalableParam<number>
}

export class EnBehaviorChase implements EntityBehavior<Enemy> {
  private props: EnBehaviorChaseProps
  public constructor(props: EnBehaviorChaseProps) {
    this.props = props
  }
  public onUpdate(enemy: Enemy, _dt: number): void {
    const speed = evaluateScalableParam(this.props.speed, enemy)

    const target = enemy.getNearestTarget()
    if (target) {
      // TODO: consider whether it's advantageous to reduce these short-lived allocations.
      const targetPos = new Phaser.Math.Vector2(target.x, target.y)
      const enemyPos = new Phaser.Math.Vector2(enemy.x, enemy.y)
      const velocity = targetPos.subtract(enemyPos).normalize().scale(speed)
      enemy.getPhysicsBody().setVelocity(velocity.x, velocity.y)
    } else {
      enemy.getPhysicsBody().setVelocity(0, 0)
    }
  }
}
