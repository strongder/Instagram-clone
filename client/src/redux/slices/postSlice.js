import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as postService from "../../services/postService";
import axiosInstance from "../../api";

export const getAllPost = createAsyncThunk("posts/getAllPost", async () => {
  const response = await axiosInstance.get('/posts')
  return response.data;
});
export const createPost = createAsyncThunk("posts/createUser", async (post) => {
  return postService.createPost(post);
});
export const getPostByUser = createAsyncThunk(
  "posts/getAllByUser",
  async (userId) => {
    return postService.getPostByUser(userId);
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    post:{},
    listPost:[],
    postUser:[],
    errorPost:false,
    loadingPost: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.listPost = action.payload;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.errorPost = true;
        state.listPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.listPost.push(action.payload);
      })
      .addCase(getPostByUser.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(getPostByUser.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.postUser = action.payload;
      })
      .addCase(getPostByUser.rejected, (state, action) => {
        state.errorPost = true;
        state.postUser = action.payload;
      })
  },
});

export default postSlice.reducer;
