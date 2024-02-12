import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fetchVariables from '@/utilities/fetchVariables'

export const fetchStoreVariables = createAsyncThunk('fetch-store-variables', fetchVariables)

const variables = createSlice({
    initialState: {
        categoriesList: []
    },
    name: "variables",
    extraReducers: (builder) => {
        builder.addCase(fetchStoreVariables.fulfilled, (_, action) => {
            return action.payload
        })
    }
})

export default variables.reducer;