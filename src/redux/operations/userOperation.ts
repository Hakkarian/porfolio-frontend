import { createAsyncThunk } from '@reduxjs/toolkit';
import {userApi} from '../service/api'
import { ILogin, IRegisterUser, IUpdUser } from '../../interfaces';

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

export const login = createAsyncThunk('user/userLogin', async (data: ILogin, { rejectWithValue }) => {
    try {
        const result = await userApi.login(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

export const currenti = createAsyncThunk('user/userCurrent', async (_, { getState, rejectWithValue }) => {
    try {
        const { user } = getState() as any;
        const result = await userApi.current(user.token);
        return result
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

export const updUser = createAsyncThunk('user/update', async (data: IUpdUser, { getState, rejectWithValue }) => {
    try {
        const { user } = getState() as any;
        const result = await userApi.updateInfo(data, user.user.userId, user.token)
        return result;
    } catch (error: any) {
        rejectWithValue(error.response);
    }
})

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const result = await userApi.logout();
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

