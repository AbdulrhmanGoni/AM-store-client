import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
    initialState: null,
    name: "User Data",
    reducers: {
        setUserData: (_, action) => action.payload,
        changeUserName_localy: (state, action) => {
            return Object.assign({}, { ...state, userName: action.payload });
        },
        setNewAvatar_localy: (state, action) => {
            return Object.assign({}, { ...state, avatar: action.payload });
        },
        setEmailAsVerified_localy: (state) => {
            return Object.assign({}, { ...state, hisEmailVerified: true });
        },
        userLogOut: () => null
    }
})

export const {
    setUserData,
    changeUserName_localy,
    setNewAvatar_localy,
    setEmailAsVerified_localy,
    userLogOut
} = userData.actions;
export default userData.reducer;