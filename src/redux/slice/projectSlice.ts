import { createSlice } from "@reduxjs/toolkit";
import { addProject, getAllProjects, updateProject } from "../operations";
import { IProject, IProjectState } from "../../interfaces";
import { pending, rejected } from "../../utils";

const initialState: IProjectState = {
  projects: [],
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, pending)
      .addCase(addProject.pending, pending)
      .addCase(updateProject.pending, pending)
      .addCase(getAllProjects.rejected, rejected)
      .addCase(addProject.rejected, rejected)
      .addCase(updateProject.rejected, rejected)
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload as IProject[];
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload)
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload
      })
  },
});

export default projectSlice.reducer;
