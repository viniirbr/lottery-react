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
        }
    }
})

export const { addBet } = cartSlice.actions;
export default cartSlice.reducer;