import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "../../functions/customFetch";

const path = (id, subPath) => `users/${id}${subPath ?? ""}`;

export const fetchUserData = createAsyncThunk("fetchUserData", async (id) => {
    const userData = await customFetch(path(id));
    return userData;
})

export const setNewUserName = async ({ userId, newName }) => {
    loadingControl(true);
    const userData = await customFetch(path(userId), "POST", { newName, type: "changeUserName" });
    loadingControl(false);
    return userData;
}

export const changeUserPassword = async ({ userId, currentPassword, newPassword }) => {
    loadingControl(true);
    const userData = await customFetch(path(userId), "POST", { currentPassword, newPassword, type: "changeUserPassword" })
    loadingControl(false);
    return userData;
}

export const passwordChecker = async (userId, unHashedPassword) => {
    loadingControl(true);
    const userData = await customFetch(path(userId, '/password'), "POST", { unHashedPassword });
    loadingControl(false);
    return userData;
}
