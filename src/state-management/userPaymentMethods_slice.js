import { createSlice } from "@reduxjs/toolkit";

const userPaymentMethods = createSlice({
    initialState: {
        cardsList: null,
        choosedMethod: "Cash"
    },
    name: "userPaymentMethods",
    reducers: {
        setUserPaymentMethods: (_, action) => action.payload,
        setChoosedPaymentMethod_localy: (state, action) => { return { ...state, choosedMethod: action.payload } },
        addCreditCard_localy: (state, action) => {
            return {
                choosedMethod: action.payload,
                cardsList: [action.payload, ...state.cardsList]
            }
        },
        deleteCreditCard_localy: (state, action) => {
            return {
                choosedMethod: state.choosedMethod?.number === action.payload ? null : state.choosedMethod,
                cardsList: state.cardsList.filter(card => card.number !== action.payload)
            }
        }
    }
})

export const {
    setUserPaymentMethods,
    setChoosedPaymentMethod_localy,
    addCreditCard_localy,
    deleteCreditCard_localy
} = userPaymentMethods.actions;

export default userPaymentMethods.reducer;