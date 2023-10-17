import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/functions/customFetch";

const path = id => `users/${id}/shopping-cart`;

export const setShoppingCart = async ({ userId, shoppingCart }) => {
    return await customFetch(path(userId), "POST", { shoppingCart, type: "set_new_cart" });
}

export const fetchShoppingCart = createAsyncThunk("fetchShoppingCart", async (userId) => {
    return await customFetch(path(userId));
},)

export const clearCart = createAsyncThunk("clearCart", async (userId) => {
    loadingControl(true);
    const data = await customFetch(path(userId), "DELETE", { type: "clear" })
    loadingControl(false);
    return data;
},)

export const addToCart = async ({ userId, productId, count }) => {
    return await customFetch(path(userId), "POST", { productId, count, type: "add_Item" })
}

export const removeFromCart = createAsyncThunk("removeFromCart", async ({ userId, productId }) => {
    loadingControl(true);
    const response = await customFetch(path(userId), "DELETE", { productId })
    loadingControl(false);
    return response;
},)
