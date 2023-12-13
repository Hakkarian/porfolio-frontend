import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi } from "../service/api";

// in this operation we're using an api to get all comments
const getAllComments = createAsyncThunk(
  "comment/getAll",
  async (data: string, { rejectWithValue }) => {
    try {
      const result = await commentsApi.getAllComments(data);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);

// in this operation we're using an api, data payload and current user's token to add a comment
const addComment = createAsyncThunk(
  "comment/add",
  async (
    data: { content: string; id: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState() as any;
      const result = await commentsApi.addComment(data, user.token);
      return result;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

// in this operation we're using an api, data payload and current user's token to update a comment

const updComment = createAsyncThunk(
  "comment/upd",
  async (
    data: { content: string; id: string; projectId: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState() as any;
      const result = await commentsApi.updateComment(data, user.token);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);

// in this operation we're using api, current user's token and data payload to delete the comment
const delComment = createAsyncThunk(
  "comment/del",
  async (
    data: { projectId: string; id: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState() as any;
      const result = await commentsApi.deleteComment(data, user.token);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);

export { getAllComments, addComment, updComment, delComment };
