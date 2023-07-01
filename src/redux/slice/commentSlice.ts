import { createSlice } from "@reduxjs/toolkit";
import { IComment, ICommentState } from "../../interfaces";
import { getAllComments, addComment, updComment, delComment } from "../operations";
import { pending, rejected } from "../../utils";

const initialState: ICommentState = {
  comments: [],
  isLoading: true,
  error: null,
};

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
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload as IComment[];
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);
      })
      .addCase(updComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(delComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
  },
});

export default commentSlice.reducer;
