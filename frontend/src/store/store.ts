import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import candidatesReducer from './features/candidatesSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        candidates: candidatesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;