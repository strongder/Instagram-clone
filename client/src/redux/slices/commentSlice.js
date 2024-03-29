import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as commentService from "../../services/commentService";
import { DirtyLens } from "@mui/icons-material";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (comment) => {
    return commentService.createComment(comment);
  }
);
export const getCommentByPost = createAsyncThunk(
  "comment/getCommentByPost",
  async (postId) => {
    return commentService.getCommentByPost(postId);
  }
);
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id) => {
    return commentService.deleteComment(id);
  }
);


const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commnent: {},
    listComment: [],
    errorComment: false,
    loadingComment: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentByPost.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(getCommentByPost.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.listComment = action.payload;
      })
      .addCase(getCommentByPost.rejected, (state, action) => {
        state.errorPost = true;
        state.listComment = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.listComment.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.errorPost = true;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.listComment = state.listComment.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
