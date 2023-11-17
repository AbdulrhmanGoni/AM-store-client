import { createSlice } from "@reduxjs/toolkit";

const shoppingCartSlice = createSlice({
    initialState: [],
    name: "shoppingCart",
    reducers: {
        addToCart_localy: (state, action) => {
            if (!state) {
                return [Object.assign(action.payload, { count: 1 })]
            }
            else if (state.some(item => item._id === action.payload._id)) {
                return state.map((item) => {
                    if (item._id === action.payload._id) {
                        return { ...item, count: action.payload.count }
                    } else return item
                })
            } else {
                return [Object.assign(action.payload, { count: 1 }), ...state]
            }
        },
        changeCount_localy: (state, action) => {
            return state.map((item) => {
                if (item._id === action.payload._id) {
                    const changedProduct = Object.assign(item, { count: action.payload.count })
                    return changedProduct
                } else {
                    return item
                }
            })
        },
        setCart_localy: (_, action) => action.payload,
        removeFromCart_localy: (state, action) => state.filter((item) => item._id !== action.payload),
        clearCart_localy: () => []
    }
})

export const {
    addToCart_localy,
    changeCount_localy,
    setCart_localy,
    removeFromCart_localy,
    clearCart_localy
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;