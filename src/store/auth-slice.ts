import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Game from 'types/Game';
import User from 'types/User';

interface AuthState {
    user: User | undefined,
}

const initialState: AuthState = {
    user: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User | boolean | undefined>) {
            state.user = action.payload as User;
        }    
    }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;