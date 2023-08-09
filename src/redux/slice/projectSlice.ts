import { createSlice } from "@reduxjs/toolkit";
import { addProject, dislike, paginate, getLikedProjects, like, updateProject } from "../operations";
import { IProject, IProjectState } from "../../interfaces";
import { pending, rejected } from "../../utils";

const initialState: IProjectState = {
  projects: [],
  favorite: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paginate.pending, pending)
      .addCase(getLikedProjects.pending, pending)
      .addCase(addProject.pending, pending)
      .addCase(updateProject.pending, pending)
      .addCase(like.pending, pending)
      .addCase(dislike.pending, pending)
      .addCase(paginate.rejected, rejected)
      .addCase(getLikedProjects.rejected, rejected)
      .addCase(addProject.rejected, rejected)
      .addCase(updateProject.rejected, rejected)
      .addCase(like.rejected, rejected)
      .addCase(dislike.rejected, rejected)
      .addCase(paginate.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.projects = payload.projects as IProject[];
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      })
      .addCase(getLikedProjects.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.favorite = payload.favorite as IProject[];
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.projects = payload;
      })
      .addCase(like.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        
        // state.projects = state.projects.map((project) =>
        //   project._id === action.payload._id ? action.payload : project
        // );
        state.projects = payload;
      })
      .addCase(dislike.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        // state.projects = state.projects.map((project) =>
        //   project._id === action.payload._id ? action.payload : project
        // );
        state.projects = payload;
      });
  },
});

export default projectSlice.reducer;
