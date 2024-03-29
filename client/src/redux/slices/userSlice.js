import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as userService from "../../services/userService";

export const getUserById = createAsyncThunk("users/getById", async (userId) => {
  const result = await userService.getUserById(userId);
  return result;
});
export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (userId) => {
    const result = await userService.getUserById(userId);
    return result;
  }
);
export const createUser = createAsyncThunk("users/createUser", async (user) => {
  return userService.createUser(user);
});
export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const result = await userService.getAllUsers();
  return result;
});

export const getFriends = createAsyncThunk(
  "users/getFriends",
  async (userId) => {
    return userService.getFriendsByUser(userId);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    userCurrent: {},
    users: [],
    friends: [],
    loadingFriend: false,
    errorFriend: false,
    loadingUser: false,
    errorUser: false,
    searchData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state, action) => {
        state.loadingFriend= true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.errorUser = true;
        state.users = action.error;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loadingFriend= false;
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.errorFriend= true;
        state.friends = action.error;
      })

      .addCase(getCurrentUser.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.userCurrent = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.errorUser = true;
        state.userCurrent = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;
