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

export const updateProject = createAsyncThunk('project/upd', async (data: any, { rejectWithValue }) => {
    try {
        const result = await projectApi.updProject(data);
        console.log('upd oper', data)
        return result;
    } catch (error: any) {
        rejectWithValue(error.response)
    }
})


