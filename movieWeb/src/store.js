import { configureStore } from '@reduxjs/toolkit';
import modalMovie from './slices/modalMovie';
import bookingMovieSlice from './slices/bookingMovieSlice';


const store = configureStore({
    reducer: {
        modalMovie,
        bookingMovieSlice,
    }
})

export default store;