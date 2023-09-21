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
            state.user_name = action.payload.user_name;
            state.token = action.payload.token;
            state.user_type = action.payload.user_type;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;