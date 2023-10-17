import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/functions/customFetch";

const path = id => `users/${id}/payment-methods`

export const fetchPaymentMethods = createAsyncThunk("fetchPaymentMethods", async (userId) => {
    return await customFetch(path(userId));
});

export const setCreditCard = createAsyncThunk("setCreditCard", async (cardData) => {
    loadingControl(true);
    const data = await customFetch(path(cardData.userId), "POST", cardData);
    loadingControl(false);
    return data;
});

export const deleteCreditCard = createAsyncThunk("deleteCreditCard", async ({ userId, cardNumber }) => {
    const data = await customFetch(path(userId), "DELETE", { cardNumber, type: "deleteCard" });
    return data;
});
