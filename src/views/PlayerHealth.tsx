import { useAppSelector } from '@/store/hooks'

export function PlayerHealth() {
  const health = useAppSelector((s) => s.player.health)
  const maxHealth = useAppSelector((s) => s.player.maxHealth)

  return <div className={'player-health'}>{`${health}/${maxHealth}`}</div>
}
