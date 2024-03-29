import { createAsyncThunk } from '@reduxjs/toolkit';
import {userApi} from '../service/api'
import { ILogin, IRegisterUser, IUpdUser } from '../../interfaces';

// here we register the user with his entered data
export const register = createAsyncThunk(
    'user/userRegister',
    async (data: IRegisterUser, {rejectWithValue}) => {
        try {
            const result = await userApi.register(data);
            return result;
        } catch (error: any) {
            rejectWithValue(error.response)
        }
    }
)

// here we login the user with his entered data
export const login = createAsyncThunk('user/userLogin', async (data: ILogin, { rejectWithValue }) => {
    try {
        const result = await userApi.login(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

// here we maintaining persistent connection between browser reloads
export const refresh = createAsyncThunk('user/refresh', async (_, { rejectWithValue }) => {
    try {
        // for this operation token is crucial
        const result = await userApi.current();
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

// this operation is needed for user information update
export const updUser = createAsyncThunk('user/update', async (data: IUpdUser, { getState, rejectWithValue }) => {
    try {
        // we're getting current user
        const { user } = getState() as any;
        if (!user.user) {
            return;
        }
        // and updating him by his id and token
        const result = await userApi.updateInfo(data, user.user._id)
        return result;
    } catch (error: any) {
        rejectWithValue(error.response);
    }
})

// here we logout the user
export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const result = await userApi.logout();
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

