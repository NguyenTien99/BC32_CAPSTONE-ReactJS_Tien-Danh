import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import movieAPI from '../services/movieAPI'

const initialState = {
    movies : [],
    loading: false,
    error : null,

    infoMovie: null,
    loadingInfoMovie: false,
    errorInfoMovie: null,    
}

export const getMovies = createAsyncThunk(
    "movie/getMovies",
    async () => {
        try {
            const data = await movieAPI.getMovies();
            return data;    
        } catch (error) {
            throw error;
        }
    }
)

export const getMoviebyId = createAsyncThunk(
    "movie/getMovieById",
    async (id) => {
        try {
            const dataInfoMoive = await movieAPI.getInfoMoviesById(id);
            return dataInfoMoive;
        } catch (error) {
            throw error;
        }
    }
)

const movieSlive = createSlice({
    name: "movie",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // Get all movies
        builder.addCase(getMovies.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getMovies.fulfilled, (state,action) => {
            return {...state, loading: false, movies: action.payload}
        });
        builder.addCase(getMovies.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message}
        })

        // Get movie by id
        builder.addCase(getMoviebyId.pending, (state,action) => {
            return {...state, loadingInfoMovie:true}
        });
        builder.addCase(getMoviebyId.fulfilled, (state,action) => {
            return {...state, loadingInfoMovie: false, infoMovie: action.payload}
        });
        builder.addCase(getMoviebyId.rejected, (state,action) => {
            return {...state, loadingInfoMovie: false, errorInfoMovie: action.error.message}
        })
        
    }
})

export default movieSlive.reducer;

