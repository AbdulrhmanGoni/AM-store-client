import { createSlice } from "@reduxjs/toolkit";

const favoritesCartSlice = createSlice({
    initialState: null,
    name: "favorites",
    reducers: {
        toggleFavorites_localy: (state, action) => {
            if (!state) return [action.payload];
            else if (state.includes(action.payload)) {
                return state.filter((productId) => productId !== action.payload);
            } else return [action.payload, ...state];
        },
        setFavorites_localy: (_, action) => action.payload,
        clearFavorites_localy: () => [],
    }
})

export const {
    toggleFavorites_localy,
    setFavorites_localy,
    clearFavorites_localy
} = favoritesCartSlice.actions;

export default favoritesCartSlice.reducer