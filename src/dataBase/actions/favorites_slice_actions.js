import { createAsyncThunk } from "@reduxjs/toolkit";
import loadingControl from "./loadingControl";
import customFetch from "../../functions/customFetch";

const path = id => `users/${id}/favorites`;

export const setFavorites = async ({ userId, favorites }) => {
    return await customFetch(path(userId), "POST", { favorites, type: "setNewFavorites" });
}

export const fetchFavorites = createAsyncThunk("fetchFavorites", async (userId) => {
    return await customFetch(path(userId));
})

export const toggleFavorites = async ({ userId, productId }) => {
    return await customFetch(path(userId), "POST", { productId, type: "toggle" });
}

export const clearFavorites = createAsyncThunk("clearFavorites", async (userId) => {
    loadingControl(true);
    const data = await customFetch(path(userId));
    loadingControl(false);
    return data;
})