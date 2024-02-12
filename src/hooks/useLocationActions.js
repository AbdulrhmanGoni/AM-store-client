import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/utilities/customFetch";
import { useSelector } from 'react-redux';


export default function useLocationActions() {

    const userId = useSelector(state => state.userData?._id);
    const path = `users/${userId}/locations`;

    const fetchLocations = async () => { return await customFetch(path) }

    const setSelectedLocation = async (theLocation) => {
        return await customFetch(path, "POST", { theLocation, type: "newSelected" });
    }

    const addNewLocation = async (theLocation) => {
        loadingControl(true);
        const data = await customFetch(path, "POST", { theLocation, type: "addNewLocation" });
        loadingControl(false);
        return data;
    }

    const deleteLocation = async (locationId) => {
        return await customFetch(path, "DELETE", { locationId });
    }

    return {
        fetchLocations,
        addNewLocation,
        deleteLocation,
        setSelectedLocation
    }
}