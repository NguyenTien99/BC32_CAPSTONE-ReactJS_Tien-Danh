import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userAPI from "../services/userAPI";

const initialState = {
    users : [],
    loadingUsers: false,
    errorUsers: null,

    infoUser: null,
    loadingUserId: false,
    errorUserId: null,
}

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async () => {
        try {
            const data = await userAPI.getUsers();
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getInfoUserById = createAsyncThunk(
    "user/getInfoUserById",
    async (id) => {
        try {
            const dataUser = await userAPI.getUserById(id);
            return dataUser;
        } catch (error) {
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Get All User
        builder.addCase(getUsers.pending, (state,action) => {
            return {...state, loadingUsers: true};
        });
        
        builder.addCase(getUsers.fulfilled, (state,action) => {
            return {...state, loadingUsers: false, users: action.payload}
        });

        builder.addCase(getUsers.rejected, (state,action) => {
            return {...state, loadingUsers: false, errorUsers: action.error.message}
        });


        //Get User by id
        builder.addCase(getInfoUserById.pending, (state,action) => {
            return {...state, loadingUserId: true, }
        });

        builder.addCase(getInfoUserById.fulfilled, (state,action) => {
            return {...state, loadingUserId: false, infoUser: action.payload}
        });

        builder.addCase(getInfoUserById.rejected, (state,action) => {
            return {...state, loadingUserId: false, errorUserId: action.error.message}
        })
    }
})

export default userSlice.reducer;