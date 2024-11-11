import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IModal {
    showError: boolean;
    message: string;
}

const initialState: IModal = {
    showError: false,
    message: ""
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalDetails: (state, action: PayloadAction<IModal>) => {
            state.showError = action.payload.showError;
            state.message = action.payload.message;
        },
    }
});

export const {setModalDetails} = modalSlice.actions;

export default modalSlice.reducer;