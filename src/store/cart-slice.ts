import { Bet } from "shared/interfaces/BetsInterfaces";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
    bets: Bet[],
    minCartValue: number
}

const initialState: CartState = {
    minCartValue: 0,
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
        },
        clearCart(state: CartState) {
            state.bets = [];
        },
        setMinCartValue(state: CartState, action: PayloadAction<number>) {
            state.minCartValue = action.payload;
        }
    }
})

export const { addBet, removeBet, clearCart, setMinCartValue } = cartSlice.actions;
export default cartSlice.reducer;