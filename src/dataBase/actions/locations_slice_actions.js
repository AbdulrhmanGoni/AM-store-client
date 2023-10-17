import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/functions/customFetch";

const path = id => `users/${id}/locations`;

export const fetchLocations = createAsyncThunk("fetchLocations", async (userId) => {
    return await customFetch(path(userId))
})

export const setSelectedLocation = createAsyncThunk("setSelectedLocation", async ({ userId, theLocation }) => {
    loadingControl(true);
    const data = await customFetch(path(userId), "POST", { theLocation, type: "newSelected" });
    loadingControl(false);
    return data;
})

export const addNewLocation = createAsyncThunk("addNewLocation", async ({ userId, theLocation }) => {
    loadingControl(true);
    const data = await customFetch(path(userId), "POST", { theLocation, type: "addNewLocation" });
    loadingControl(false);
    return data;
})

export const deleteLocation = createAsyncThunk("deleteLocation", async ({ userId, locationId }) => {
    loadingControl(true);
    const data = await customFetch(path(userId), "DELETE", { locationId });
    loadingControl(false);
    return data;
})