import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token } from 'shared/interfaces/AuthInterfaces';

interface AuthState {
    token: Token | undefined
}

const initialState: AuthState = {
    token: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<Token>) {
            state.token = action.payload;
        },
        logout(state) {
            state.token = undefined;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;