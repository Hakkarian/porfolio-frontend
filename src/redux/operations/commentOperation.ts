import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi } from "../service/api";

const getAllComments = createAsyncThunk(
    'comment/getAll', async (data: string, {rejectWithValue}) => {
    try {
        const result = await commentsApi.getAllComments(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
    }
)

const addComment = createAsyncThunk('comment/add', async (data: {content: string, id: string}, {getState, rejectWithValue}) => {
    try {
        const { user } = getState() as any;
        console.log('comment oper', data, user.token)
        const result = await commentsApi.addComment(data, user.token);
        console.log('comment after', result)
        return result;
    } catch (error: any) {
        rejectWithValue(error)
    }
})

const updComment = createAsyncThunk('comment/upd', async (data: { content: string, id: string, projectId: string }, { getState, rejectWithValue }) => {
    try {
        const { user } = getState() as any;
        console.log('commment upd oper', data, user.token);
        const result = await commentsApi.updateComment(data, user.token);
        return result
    } catch (error: any) {
        rejectWithValue(error.response);
    }
})

const delComment = createAsyncThunk(
  "comment/del",
  async (
      data: { projectId: string, id: string},
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState() as any;
      console.log("commment del oper", user.token);
      const result = await commentsApi.deleteComment(data, user.token);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);


export { getAllComments, addComment, updComment, delComment };