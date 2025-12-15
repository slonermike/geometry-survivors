import type { IAggressor } from './IAggressor'

export interface IDamageable {
  doDamage: (damageAmount: number, source: IAggressor) => void
}
