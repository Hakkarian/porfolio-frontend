import { createSlice } from "@reduxjs/toolkit";
import {
  addProject,
  dislike,
  paginate,
  getLikedProjects,
  like,
  updateProject,
} from "../operations";
import { IProject, IProjectState } from "../../interfaces";
import { pending, rejected } from "../../utils";

// initial state is for redux slice
// with an array of projects and favorite projects,
// a number of the current page, and current page of favorite projects
// a total number of regular and favorite pages
// and an error indicator

const initialState: IProjectState = {
  projects: [],
  favorite: [],
  currentPage: 1,
  currentLikedPage: 1,
  totalPages: 1,
  totalLikedPages: 1,
  isLoading: false,
  error: null,
};

// connect to the slice asynchronous reducers along with initialState
// these extraReducers have three states - pending, rejected, and fulfilled
// pending state is needed of a loading purpose
// rejected is for displaying errors
// fulfilled is for showing results
// name is for pointing out which exactly state we're going to change

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
      .addCase(paginate.fulfilled, (state, { payload }) => {
        // pass to the state an array of projects,
        // a number of a current page
        // and a number of total pages
        state.isLoading = false;
        state.projects = payload.projects as IProject[];
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      })
      .addCase(getLikedProjects.fulfilled, (state, { payload }) => {
        // same goes for favorite projects also
        state.isLoading = false;
        state.favorite = payload.favorite as IProject[];
        state.currentLikedPage = payload.currentLikedPage;
        state.totalLikedPages = payload.totalLikedPages;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        // add a project through pushing it inside of the array
        state.isLoading = false;
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        // update the list of projects
        state.isLoading = false;
        state.projects = payload;
      })
      // add like or dislike, and update the list of projects
      .addCase(like.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = payload;
      })
      .addCase(dislike.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.projects = payload;
      });
  },
});

export default projectSlice.reducer;
