import { createSlice } from "@reduxjs/toolkit";
import { getAllProjects } from "../operations";
import { IProject, IProjectState } from "../../interfaces";

const initialState: IProjectState = {
    projects: [],
    isLoading: false,
    error: null
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getAllProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string | null;
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.projects = action.payload as IProject[];
            })
    }
})

export default projectSlice.reducer;