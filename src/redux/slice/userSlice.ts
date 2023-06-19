import { createSlice } from '@reduxjs/toolkit';
import { register } from '../operations';
import { IUserState } from '../../interfaces';


const initialState: IUserState = {
    user: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: builder => 
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string | null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.data.user;
            })
})

export default userSlice.reducer;