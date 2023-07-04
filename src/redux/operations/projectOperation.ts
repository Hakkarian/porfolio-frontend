import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectApi } from "../service/api";

export const getAllProjects = createAsyncThunk('project/getAll', async (_, {rejectWithValue}) => {
    try {
        const result = await projectApi.getAllProjects();
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

export const addProject = createAsyncThunk('project/add', async (data: any, {rejectWithValue}) => {
    try {
        const result = await projectApi.addProject(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

export const updateProject = createAsyncThunk('project/upd', async (data: any, { getState, rejectWithValue }) => {
    try {
        const { user } = getState() as any;
        const result = await projectApi.updProject(data, user.token);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

export const like = createAsyncThunk('project/like', async (data: { likes: number, liked: string[], id: string }, { getState, rejectWithValue }) => {
    try {
        const { user } = getState() as any;
        const result = projectApi.changeLike(data, user.token);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

export const dislike = createAsyncThunk(
  "project/dislike",
  async (
    data: { dislikes: number, disliked: string[], id: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState() as any;
      const result = projectApi.changeDislike(data, user.token);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);

