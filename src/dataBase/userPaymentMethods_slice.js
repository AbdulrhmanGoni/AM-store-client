import { createSlice } from "@reduxjs/toolkit";
import {
    deleteCreditCard,
    fetchPaymentMethods,
    setCreditCard
} from "./actions/userPaymentMethods_slice_actions";

const userPaymentMethods = createSlice({
    initialState: {
        cardsList: null,
        choosedMethod: "Cash"
    },
    name: "userPaymentMethods",
    reducers: {
        choosePaymentMethod: (state, action) => {
            return state = {
                cardsList: state.cardsList,
                choosedMethod: action.payload
            };
        },
    },
    extraReducers: (bulter) => {
        bulter.addCase(fetchPaymentMethods.fulfilled, (_, action) => action.payload);
        bulter.addCase(setCreditCard.fulfilled, (_, action) => action.payload);
        bulter.addCase(deleteCreditCard.fulfilled, (_, action) => action.payload);
    }
})

export const { choosePaymentMethod } = userPaymentMethods.actions;
export default userPaymentMethods.reducer;