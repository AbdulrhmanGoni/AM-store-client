import { createSlice } from "@reduxjs/toolkit";

const loadingCircle = createSlice({
    initialState: false,
    name: "loadingCircle",
    reducers: {
        setLoading: (state, a) => a.payload
    }
})

export const { setLoading } = loadingCircle.actions;
export default loadingCircle.reducer; 