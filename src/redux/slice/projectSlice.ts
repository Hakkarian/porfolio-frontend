import { createSlice } from "@reduxjs/toolkit";
import { addProject, dislike, getAllProjects, like, updateProject } from "../operations";
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
      .addCase(like.pending, pending)
      .addCase(dislike.pending, pending)
      .addCase(getAllProjects.rejected, rejected)
      .addCase(addProject.rejected, rejected)
      .addCase(updateProject.rejected, rejected)
      .addCase(like.rejected, rejected)
      .addCase(dislike.rejected, rejected)
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload as IProject[];
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
      })
      .addCase(dislike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
      });
  },
});

export default projectSlice.reducer;
