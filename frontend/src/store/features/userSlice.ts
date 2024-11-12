import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, objectID} from '../../../../backend/src/models/userModel';
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
    allUsers: IUser[] | null;
}

const BASE_URL: string = "http://localhost:3001/api";

export const registerUser = createAsyncThunk("user/registerUser", async (userData: {username: string, password: string}) => {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    console.log(response.data);
});

export const loginUser = createAsyncThunk("user/loginUser", async (userData: {username: string, password: string}): Promise<ResponseOfAPI> => {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    console.log(response.data);
    localStorage.setItem("myUserToken", JSON.stringify(response.data.token));
    return response.data;
});

export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers", async () => {
    const token = JSON.parse(localStorage.getItem("myUserToken")!);
    const response = await axios.get(`${BASE_URL}/users`, {headers: {Authorization: `Bearer ${token}`}});
    console.log(response.data);
    return response.data;
});

const initialState: UserStateType = {
    user: {
        username: "", password: "", hasVoted: false, votedFor: null, isAdmin: false
    },
    error: false,
    errorMessage: null,
    isLoading: false,
    token: null,
    allUsers: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setVote: (state, action: PayloadAction<objectID>) => {
            (state.user.votedFor as objectID) = action.payload;
            state.user.hasVoted = true;
        },
        removeVote: (state) => {
            state.user.votedFor = null;
            state.user.hasVoted = false;
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
            state.errorMessage = "could not registered, please make sure to enter your details correctly";
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
            state.errorMessage = "could not log in, please make sure to enter your details correctly";
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
        .addCase(fetchAllUsers.pending, (state) => {
            state.error = false;
            state.errorMessage = null;
            state.isLoading = true;
            state.allUsers = null;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.error = true;
            state.errorMessage = action.error as string;
            state.isLoading = false;
            state.allUsers = null;
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.error = false;
            state.errorMessage = null;
            state.isLoading = false;
            state.allUsers = action.payload.users;
        })
    },
});

export const {setVote, removeVote, setError, logout} = userSlice.actions;

export default userSlice.reducer;