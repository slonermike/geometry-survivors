import { PlayerHealth } from './PlayerHealth'

import './HUD.css'

export function HUD() {
  return (
    <div className="hud">
      <PlayerHealth />
    </div>
  )
}
