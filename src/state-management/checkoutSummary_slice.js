import { createSlice } from "@reduxjs/toolkit";

const checkoutSummary = createSlice({
    initialState: { totalPrice: 0, discountCobone: null },
    name: "checkoutSummary",
    reducers: {
        setSummaryPrice: (state, action) => {
            return { totalPrice: action.payload, discountCobone: state.discountCobone };
        },
        discountCobone: (state, action) => {
            return { discountCobone: action.payload, totalPrice: state.totalPrice };
        },
        clearCheckoutSummary: () => {
            return { totalPrice: 0, discountCobone: null };
        },
        removeDiscount: (state) => {
            return { totalPrice: state.totalPrice, discountCobone: null };
        }
    }
});

export const {
    setSummaryPrice,
    discountCobone,
    clearCheckoutSummary,
    removeDiscount
} = checkoutSummary.actions;
export default checkoutSummary.reducer;