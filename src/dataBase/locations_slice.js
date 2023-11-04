import { createSlice } from "@reduxjs/toolkit";
import {
    addNewLocation,
    deleteLocation,
    fetchLocations,
    setSelectedLocation
} from "./actions/locations_slice_actions";


const Locations = createSlice({
    initialState: {
        locationsList: null,
        selectedLocation: null
    },
    name: "locationsManegement",
    reducers: {
        clearLocations: () => {
            return { locationsList: [], selectedLocation: null };
        }
    },
    extraReducers: (bulter) => {
        bulter.addCase(fetchLocations.fulfilled, (_, action) => action.payload);
        bulter.addCase(setSelectedLocation.fulfilled, (_, action) => action.payload);
        bulter.addCase(addNewLocation.fulfilled, (_, action) => action.payload);
        bulter.addCase(deleteLocation.fulfilled, (_, action) => action.payload);
    }
})

export const { clearLocations } = Locations.actions
export default Locations.reducer