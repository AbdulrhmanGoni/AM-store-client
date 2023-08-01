import { createSlice } from "@reduxjs/toolkit";
import {
    fetchFavorites,
} from "./actions/favorites_slice_actions";


const favoritesCartSlice = createSlice({
    initialState: null,
    name: "favorites",
    reducers: {
        toggleFavorites_localy: (state, action) => {
            if (!state) return [action.payload];
            else if (state.includes(action.payload)) {
                return state.filter((item) => item !== action.payload);
            } else return [action.payload, ...state];
        },
        setFavorites_localy: (_, action) => action.payload,
        clearFavorites_localy: () => null,
    },
    extraReducers: (bulter) => {
        bulter.addCase(fetchFavorites.fulfilled, (_, action) => action.payload);
    }
})

export const {
    toggleFavorites_localy,
    setFavorites_localy,
    clearFavorites_localy
} = favoritesCartSlice.actions;
export default favoritesCartSlice.reducer