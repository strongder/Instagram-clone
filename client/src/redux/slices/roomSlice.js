import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roomService from "../../services/roomService";

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (data) => {
    return roomService.createRoom(data);
  }
);
export const getRoomByUser = createAsyncThunk(
  "rooms/getRoomByUser",
  async (userId) => {
    return roomService.getRoomByUser(userId);
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    room: {},
    listRoom: [],
    errorRoom: false,
    loadingRoom: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomByUser.pending, (state) => {
        state.loadingRoom = true;
      })
      .addCase(getRoomByUser.fulfilled, (state, action) => {
        state.loadingRoom = false;
        state.listRoom = action.payload;
      })
      .addCase(getRoomByUser.rejected, (state, action) => {
        state.errorPost = true;
        state.loadingRoom = action.error;
      })
      .addCase(createRoom.pending, (state) => {
        state.loadingRoom = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loadingRoom = false;
        state.list.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.errorRoom = true;
      })
  },
});

export default roomSlice.reducer;
