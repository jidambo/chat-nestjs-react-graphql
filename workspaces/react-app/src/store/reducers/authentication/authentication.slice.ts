import { createSlice } from '@reduxjs/toolkit';
import authenticationActions from './authentication.actions';
import { User } from '../../../common/interfaces/entities';

export interface AuthenticationSliceState {
    user: User | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
}

const initialState: AuthenticationSliceState = {
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authenticationActions.signIn.pending, (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAuthenticating = true;
        });

        builder.addCase(authenticationActions.signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isAuthenticating = false;
        });

        builder.addCase(authenticationActions.signIn.rejected, (state, action) => {
            Object.assign(state, initialState);
        });


        builder.addCase(authenticationActions.authUser.pending, (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAuthenticating = true;
        });

        builder.addCase(authenticationActions.authUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = Boolean(action.payload);
            state.isAuthenticating = false;
        });

        builder.addCase(authenticationActions.authUser.rejected, (state, action) => {
            Object.assign(state, initialState);
        });

        builder.addCase(authenticationActions.signOut.fulfilled, (state, action) => {
            Object.assign(state, initialState);
        });

        builder.addCase(authenticationActions.signOut.rejected, (state, action) => {
            Object.assign(state, initialState);
        });
    },
});
