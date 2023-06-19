import { createSlice } from "@reduxjs/toolkit";
import { IComment, ICommentState } from "../../interfaces";
import { getAllComments } from "../operations";

const initialState: ICommentState = {
    comments: [],
    isLoading: true,
    error: null
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
         
    },
    extraReducers: builder => {
        builder
            .addCase(getAllComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string | null
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload as IComment[];
            })
    }
})

export default commentSlice.reducer;