import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectApi } from "../service/api";

export const getAllProjects = createAsyncThunk('project/getAll', async () => {
    try {
        const result = await projectApi.getAllProjects();
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    }
})

