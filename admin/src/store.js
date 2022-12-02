import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import modalSlice from "./slices/modalSlice";
import usersSlice from "./slices/usersSlice";
import movieSlive from "./slices/movieSlive";

const store = configureStore({
  reducer: {
    authSlice,
    modalSlice,
    usersSlice,
    movieSlive,
  },
});

export default store;
