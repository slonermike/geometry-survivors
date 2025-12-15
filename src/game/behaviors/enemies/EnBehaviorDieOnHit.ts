import type { Enemy } from '@/game/entities/Enemy'
import type { EntityBehavior } from '../weapons/types'
import { evaluateScalableParam, type ScalableParam } from '../util'
import type { GameEntity } from '@/game/entities/GameEntity'

interface Props {
  damage: ScalableParam<number>
}

export class EnBehaviorDieOnHit implements EntityBehavior<Enemy> {
  private props: Props
  constructor(props: Props) {
    this.props = props
  }
  public onHitOther(enemy: Enemy, other: GameEntity): void {
    if (other.isDamageable()) {
      const damage = evaluateScalableParam(this.props.damage, enemy)
      other.doDamage(damage, enemy)
      enemy.despawn()
    }
  }
}
