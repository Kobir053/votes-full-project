import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { objectID } from "../../../../backend/src/models/userModel";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface ICandidate {
    _id?: objectID;
    name: string;
    image: string;
    votes: number;
}

interface CandidateStateType {
    candidates: ICandidate[];
    error: boolean;
    errorMessage: string | null;
    isLoading: boolean;
}

const initialState: CandidateStateType = {
    candidates: [],
    error: false,
    errorMessage: null,
    isLoading: false
};

const BASE_URL: string = "http://localhost:3001/api";

export const fetchCandidates = createAsyncThunk("candidates/fetchCandidates", async () => {
    const token = JSON.parse(localStorage.getItem("myUserToken")!);
    if(!token)
        throw new Error("you don't have any token");

    const response = await axios.get(`${BASE_URL}/candidates`, {headers: {Authorization: `Bearer ${token}`}});
    console.log(response.data);
    return response.data.candidates;
});

const candidatesSlice = createSlice({
    name: "candidates",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchCandidates.pending, (state) => {
            state.error = false;
            state.errorMessage = null;
            state.isLoading = true;
        })
        .addCase(fetchCandidates.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message!;
        })
        .addCase(fetchCandidates.fulfilled, (state, action) => {
            state.error = false;
            state.errorMessage = null;
            state.isLoading = false;
            state.candidates = action.payload;
        })
    },
});

export default candidatesSlice.reducer;