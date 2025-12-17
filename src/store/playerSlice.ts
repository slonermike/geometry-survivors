import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
  health: number
  maxHealth: number
}

const initialState: PlayerState = {
  health: 0,
  maxHealth: 0,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayerHealth: (state, action: PayloadAction<{ health: number; maxHealth: number }>) => {
      state.health = action.payload.health
      state.maxHealth = action.payload.maxHealth
    },
  },
})

export const { updatePlayerHealth } = playerSlice.actions
export default playerSlice.reducer
