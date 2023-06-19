import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi } from "../service/api";

const getAllComments = createAsyncThunk(
    'comment/getAll', async (data: string, {rejectWithValue}) => {
    try {
        const result = await commentsApi.getAllComments(data);
        return result;
    } catch (error) {
        rejectWithValue(error)
    }
    }
)

export { getAllComments };