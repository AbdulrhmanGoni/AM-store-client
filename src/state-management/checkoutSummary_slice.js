import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    discountCobone: null,
    paymentMethod: "Cash"
}

const checkoutSummary = createSlice({
    initialState,
    name: "checkoutSummary",
    reducers: {
        setSummaryPrice: (state, action) => {
            return {
                ...state,
                totalPrice: action.payload
            }
        },
        includeDiscount: (state, action) => {
            return {
                ...state,
                discountCobone: action.payload
            }
        },
        setCheckoutPaymentMethod: (state, action) => {
            return {
                ...state,
                paymentMethod: action.payload
            }
        },
        clearCheckoutSummary: () => initialState,
        removeDiscount: (state) => {
            return {
                ...state,
                discountCobone: null
            }
        }
    }
});

export const {
    setSummaryPrice,
    includeDiscount,
    setCheckoutPaymentMethod,
    clearCheckoutSummary,
    removeDiscount
} = checkoutSummary.actions;
export default checkoutSummary.reducer;