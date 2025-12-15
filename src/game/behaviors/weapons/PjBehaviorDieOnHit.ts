import type { Projectile } from '@/game/entities/Projectile'
import type { EntityBehavior } from './types'
import type { GameEntity } from '@/game/entities/GameEntity'
import { evaluateScalableParam, type ScalableParam } from '../util'

interface Props {
  damage: ScalableParam<number>
}

export class PjBehaviorDieOnHit implements EntityBehavior<Projectile> {
  private props: Props
  public constructor(props: Props) {
    this.props = props
  }
  public onHitOther(pj: Projectile, other: GameEntity): void {
    if (other.isDamageable()) {
      const damage = evaluateScalableParam(this.props.damage, pj)
      other.doDamage(damage, pj)
      pj.despawn()
    }
  }
}
