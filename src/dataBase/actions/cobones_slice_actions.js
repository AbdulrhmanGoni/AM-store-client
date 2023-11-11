import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '@/functions/customFetch';

export const getcobones = createAsyncThunk("getcobones", async () => {
    const response = await customFetch(`settings/cobones`);
    return response;
})
