import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isopeneditmovies: false,
  modalUser: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeModalEditMovie: (state, action) => {
      return { ...state, isopeneditmovies: !state.isopeneditmovies };
    },
    changModalUser: (state, action) => {
      return { ...state, modalUser: !state.modalUser };
    },
  },
});

export const { changeModalEditMovie } = modalSlice.actions;
export const { changModalUser } = modalSlice.actions;

export default modalSlice.reducer;
