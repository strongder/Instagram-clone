import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as followService from "../../services/followService";

export const sendFollow = createAsyncThunk(
  "follows/sendFollow",
  async (follow) => {
    return followService.sendFollow(follow);
  }
);
export const accept = createAsyncThunk("follows/accept", async (followId) => {
  return followService.accept(followId);
});
export const getFollowByUser = createAsyncThunk(
  "follows/getFollowByUser",
  async (userId) => {
    return followService.getFollowByUser(userId);
  }
);
export const decline = createAsyncThunk("follows/decile", async (followId) => {
  return followService.decline(followId);
});

const followSlice = createSlice({
  name: "follows",
  initialState: {
    currentFriendShip: {},
    listFollow: [],
    listRequestFl: [],
    errorFollow: false,
    loadingFollow: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFollow.pending, (state) => {
        state.loadingFollow = true;
      })
      .addCase(sendFollow.fulfilled, (state, action) => {
        state.loadingFollow = false;
        state.listFollow.push(action.payload);
      })
      .addCase(sendFollow.rejected, (state, action) => {
        state.errorPost = true;
        state.listFollow = action.payload;
      })
      .addCase(getFollowByUser.pending, (state) => {
        state.loadingFollow = true;
      })
      .addCase(getFollowByUser.fulfilled, (state, action) => {
        state.loadingFollow = false;
        state.listRequestFl = action.payload;
      })
      .addCase(accept.fulfilled, (state, action) => {
        state.loadingPost = false;
        const fsIndex = state.listRequestFl.findIndex(
          (fs) => fs.id === action.payload.id
        );
        if (fsIndex !== -1) {
          state.listRequestFl[fsIndex] = action.payload;
        }
      })
      .addCase(accept.rejected, (state, action) => {
        state.errorPost = true;
      })
      .addCase(decline.fulfilled, (state, action) => {
        state.loadingFollow = false;
        state.listRequestFl = state.listRequestFl.filter(
          (follow) => follow.id !== action.payload.id
        );
      });
  },
});

export default followSlice.reducer;
