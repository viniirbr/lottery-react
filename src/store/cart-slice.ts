import Bet from "types/Bet";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
    bets: Bet[]
}

const initialState: CartState = {
    bets: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addBet(state: CartState, action: PayloadAction<Bet>) {
            state.bets.push(action.payload)
        },
        removeBet(state: CartState, action: PayloadAction<Bet>) {
            const { bets } = state
            bets.splice(bets.findIndex(bet => bet.id === action.payload.id), 1);
            state.bets = bets;
        }
    }
})

export const { addBet } = cartSlice.actions;
export const { removeBet } = cartSlice.actions;
export default cartSlice.reducer;