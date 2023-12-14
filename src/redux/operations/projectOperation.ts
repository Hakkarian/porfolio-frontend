import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectApi } from "../service/api";

// in this operation we're getting paginated projects up to 4 projects per page
// and pass the payload inside an api function

export const paginate = createAsyncThunk('project/getPaginate', async (data: {page: number, limit: number}, {rejectWithValue}) => {
    try {
        const result = await projectApi.getPaginatedProjects(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

// in this operation we're getting favorite paginated objects up to 4 projects per page
// and pass the data payload inside an api function
export const getLikedProjects = createAsyncThunk(
  "project/getLiked",
  async (data: {page: number, limit: number}, { rejectWithValue }) => {
    try {
      const result = await projectApi.getLikedProjects(data);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);

// in this operation we add a new project using the data as a parameter
export const addProject = createAsyncThunk('project/add', async (data: any, {rejectWithValue}) => {
    try {
        const result = await projectApi.addProject(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

// in this operation we update an existing project, using data and returning the current user
// and updating projects using a data payload and a user token

export const updateProject = createAsyncThunk('project/upd', async (data: any, { getState, rejectWithValue }) => {
    try {
        const { user } = getState() as any;
        const result = await projectApi.updProject(data, user.token);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

// in this operation we add or remove like
// we're passing inside of the like function a payload with data
// is which we have likes as a number,
// an array of users who liked a project
// a page with a limit of 4 projects per page
// and a project's id


export const like = createAsyncThunk('project/like', async (data: { likes: number, liked: string[], page: number, limit: number, id: string }, { rejectWithValue }) => {
    try {
        const result = projectApi.changeLike(data);
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})

// same goes here except for dislikes
export const dislike = createAsyncThunk(
  "project/dislike",
  async (
    data: { dislikes: number, disliked: string[], page: number, limit: number, id: string },
    { rejectWithValue }
  ) => {
    try {
      const result = projectApi.changeDislike(data);
      return result;
    } catch (error: any) {
      rejectWithValue(error.response);
    }
  }
);

