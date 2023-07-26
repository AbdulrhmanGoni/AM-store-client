import { configureStore } from "@reduxjs/toolkit";
import shoppingCart from "./shoppingCart_slice";
import favorites from "./favorites_slice";
import userData from "./userData_slice";
import userPaymentMethods from "./userPaymentMethods_slice";
import locations from "./locations_slice";
import cobones from "./cobones_slice";
import checkoutSummary from "./checkoutSummary_slice";
import isLoading from "./loadingCircle_slice";


const dataCenter = configureStore({
    reducer: {
        shoppingCart,
        favorites,
        userData,
        cobones,
        userPaymentMethods,
        locations,
        checkoutSummary,
        isLoading
    }
})


export default dataCenter