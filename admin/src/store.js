import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import modalSlice from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    authSlice,
    modalSlice,
  },
});

export default store;
