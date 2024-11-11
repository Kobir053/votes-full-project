import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { objectID} from '../../../../backend/src/models/userModel';
import axios from "axios";

interface ResponseOfAPI {
    user: UserType;
    token: string;
}

export interface UserType {
    _id?: objectID;
    username: string;
    password: string;
    isAdmin: boolean;
    hasVoted: boolean;
    votedFor: objectID | null;
}

interface UserStateType {
    user: UserType;
    isLoading: boolean;
    error: boolean;
    errorMessage: string | null;
    token: string | null;
}

export const registerUser = createAsyncThunk("user/registerUser", async (userData: {username: string, password: string}) => {
    const response = await axios.post("http://localhost:3001/api/register", userData);
    console.log(response.data);
});

export const loginUser = createAsyncThunk("user/loginUser", async (userData: {username: string, password: string}): Promise<ResponseOfAPI> => {
    const response = await axios.post("http://localhost:3001/api/login", userData);
    console.log(response.data);
    localStorage.setItem("myUserToken", JSON.stringify(response.data.token));
    return response.data;
});

const initialState: UserStateType = {
    user: {
        username: "", password: "", hasVoted: false, votedFor: null, isAdmin: false
    },
    error: false,
    errorMessage: null,
    isLoading: false,
    token: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setVote: (state, action: PayloadAction<{votedFor: keyof UserType["votedFor"]}>) => {
            state.user.votedFor = action.payload.votedFor;
        },
        removeVote: (state) => {
            state.user.votedFor = null;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = false;
            state.errorMessage = action.payload;
        },
        logout: (state) => {
            (state.user as UserType) = initialState.user;
            state.token = null; 
        }
    },
    extraReducers(builder) {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = "could not registered";
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = "could not log in";
            (state.user as UserType) = initialState.user;
            console.log("login rejected");
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            (state.user as UserType) = action.payload.user;
            state.token = action.payload.token;
        })
    },
});

export const {setVote, removeVote, setError, logout} = userSlice.actions;

export default userSlice.reducer;