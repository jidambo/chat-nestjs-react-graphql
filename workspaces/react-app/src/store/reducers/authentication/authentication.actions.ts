import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../common/interfaces/entities';

const USER_KEY = 'user';

const signIn = createAsyncThunk(
    'authentication/singIn',
    async (credentials: User) => {
        // make request to login

        const profile = {
            username: credentials.username
        };

        localStorage.setItem(USER_KEY, JSON.stringify(profile));

        return profile;
    }
);

const signOut = createAsyncThunk(
    'authentication/signOut',
    async () => {
        // make request to sign out

        localStorage.removeItem(USER_KEY);

        return {
            success: true
        };
    }
);

const authUser = createAsyncThunk(
    'authentication/authUser',
    async () => {
        // check is user/token/etc is valid

        return JSON.parse(localStorage.getItem(USER_KEY) || '');
    }
)

const authenticationActions = {
    signIn,
    signOut,
    authUser
};

export default authenticationActions;
