import { createAsyncThunk } from '@reduxjs/toolkit';
import {userApi} from '../service/api'
import { IUser } from '../../interfaces';

export const register = createAsyncThunk(
    'user/userRegister',
    async(data: IUser, {rejectWithValue}) => {
        try {
            const result = await userApi.register(data)
            return result;
        } catch (error) {
            rejectWithValue(error)
        }
    }
)