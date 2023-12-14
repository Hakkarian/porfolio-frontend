import { createSlice } from "@reduxjs/toolkit";
import { IComment, ICommentState } from "../../interfaces";
import {
  getAllComments,
  addComment,
  updComment,
  delComment,
} from "../operations";
import { pending, rejected } from "../../utils";

// initial state is for redux slice
// with an array of comments, boolean isLoading and an error indicator
const initialState: ICommentState = {
  comments: [],
  isLoading: true,
  error: null,
};

// connect to the slice asynchronous reducers along with initialState
// these extraReducers have three states - pending, rejected, and fulfilled
// pending state is needed of a loading purpose
// rejected is for displaying errors
// fulfilled is for showing results
// name is for pointing out which exactly state we're going to change

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, pending)
      .addCase(addComment.pending, pending)
      .addCase(updComment.pending, pending)
      .addCase(delComment.pending, pending)
      .addCase(getAllComments.rejected, rejected)
      .addCase(addComment.rejected, rejected)
      .addCase(updComment.rejected, rejected)
      .addCase(delComment.rejected, rejected)
      .addCase(getAllComments.fulfilled, (state, { payload }) => {
        // if fulfilled, fill an array of comments with a comments' payload
        state.isLoading = false;
        state.comments = payload as IComment[];
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        // add one comment to the array
        state.isLoading = false;
        state.comments.push(payload);
      })
      .addCase(updComment.fulfilled, (state, { payload }) => {
        // update the comment by rerendering the list of comments
        state.isLoading = false;
        state.comments = payload;
      })
      .addCase(delComment.fulfilled, (state, { payload }) => {
        // delete a comment and update the list of comments
        state.isLoading = false;
        state.comments = payload;
      });
  },
});

export default commentSlice.reducer;
