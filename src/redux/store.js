import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import { createLogger } from "redux-logger";

const store = configureStore({
    reducer: {
        user: userReducer, 
    },
    middleware: [createLogger()],
});

export default store;