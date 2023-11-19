import { createSlice } from "@reduxjs/toolkit";

const cobones = createSlice({
    initialState: null,
    name: "getcobones",
    reducers: {
        setDiscountCobones: (_, action) => action.payload
    }
})

export const { setDiscountCobones } = cobones.actions;

export default cobones.reducer;