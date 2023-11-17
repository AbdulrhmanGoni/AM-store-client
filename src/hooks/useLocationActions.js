import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/functions/customFetch";


export default function useLocationActions() {

    const path = id => `users/${id}/locations`;

    const fetchLocations = async (userId) => { return await customFetch(path(userId)) }

    const setSelectedLocation = async ({ userId, theLocation }) => {
        return await customFetch(path(userId), "POST", { theLocation, type: "newSelected" });
    }

    const addNewLocation = async ({ userId, theLocation }) => {
        loadingControl(true);
        const data = await customFetch(path(userId), "POST", { theLocation, type: "addNewLocation" });
        loadingControl(false);
        return data;
    }

    const deleteLocation = async ({ userId, locationId }) => {
        return await customFetch(path(userId), "DELETE", { locationId });
    }

    return {
        fetchLocations,
        addNewLocation,
        deleteLocation,
        setSelectedLocation
    }
}