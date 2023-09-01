import { createSlice } from "@reduxjs/toolkit";
import { getcobones } from "./actions/cobones_slice_actions";

const cobones = createSlice({
    initialState: null,
    name: "getcobones",
    reducers: {},
    extraReducers: (bulter) => {
        bulter.addCase(getcobones.fulfilled, (state, action) => action.payload);
    }
})

export default cobones.reducer;