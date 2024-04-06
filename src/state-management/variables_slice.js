import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fetchVariables from '@/utilities/fetchVariables'

export const fetchStoreVariables = createAsyncThunk('fetch-store-variables', fetchVariables)

const variables = createSlice({
    initialState: {
        productsCategories: [],
        minFreeDeliveryEntitlementPrice: null,
        deliveryPrice: null
    },
    name: "variables",
    extraReducers: (builder) => {
        builder.addCase(fetchStoreVariables.fulfilled, (_, action) => {
            return action.payload
        })

        builder.addCase(fetchStoreVariables.pending, () => {
            return { isLoading: true }
        })
    }
})

export default variables.reducer;