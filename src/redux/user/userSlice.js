import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_name: "",
    token: "",
    user_type: 0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = {
                ...state, ...action.payload
            };
        },
        updateData: (state, action) => {
            state = {
                ...state,
                lastUpdate: action.payload.data
            }; 
        },
    },
});

export const { setUser, updateData} = userSlice.actions;
export default userSlice.reducer;