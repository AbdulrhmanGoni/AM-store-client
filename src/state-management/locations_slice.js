import { createSlice } from "@reduxjs/toolkit";

const Locations = createSlice({
    initialState: {
        locationsList: null,
        selectedLocation: null
    },
    name: "locationsManegement",
    reducers: {
        setUserLocations: (_, action) => action.payload,
        addNewLocation_localy: (state, action) => {
            return {
                selectedLocation: action.payload,
                locationsList: [action.payload, ...state.locationsList]
            }
        },
        deleteLocation_localy: (state, action) => {
            return {
                selectedLocation: state.selectedLocation.id == action.payload ? null : state.selectedLocation,
                locationsList: state.locationsList.filter((location) => location.id !== action.payload)
            }
        },
        setSelectedLocation_localy: (state, action) => {
            return { ...state, selectedLocation: action.payload }
        },
        clearLocations: () => { return { locationsList: [], selectedLocation: null }; }
    }
})

export const {
    setUserLocations,
    addNewLocation_localy,
    deleteLocation_localy,
    setSelectedLocation_localy,
    clearLocations
} = Locations.actions;
export default Locations.reducer