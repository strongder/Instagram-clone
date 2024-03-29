import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/slices/userSlice";
import postReducer from "./redux/slices/postSlice";
import commentReducer from "./redux/slices/commentSlice"
import followReducer from "./redux/slices/followSlice"
import roomReducer from  "./redux/slices/roomSlice"
const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
    rooms: roomReducer,
    follows: followReducer,
  },
  // devTools: true,
});

export default store;
