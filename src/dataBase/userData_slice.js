import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./actions/userData_slice_actions";

const userData = createSlice({
    initialState: null,
    name: "User Data",
    reducers: {
        setUserData: (_, action) => action.payload,
        setNewUserName_localy: (state, action) => {
            return Object.assign({}, { ...state, userName: action.payload });
        },
        setNewAvatar_localy: (state, action) => {
            return Object.assign({}, { ...state, avatar: action.payload });
        },
        userLogOut: () => null
    },
    extraReducers: (bulter) => {
        bulter.addCase(fetchUserData.fulfilled, (_, action) => action.payload);
    }
})

export const {
    setUserData,
    setNewUserName_localy,
    setNewAvatar_localy,
    userLogOut
} = userData.actions;
export default userData.reducer;