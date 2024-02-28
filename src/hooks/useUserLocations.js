import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useLocationActions from "@/hooks/useLocationActions";
import { setUserLocations } from "@/state-management/locations_slice";

export default function useUserLocations() {

    const { fetchLocations } = useLocationActions();
    const dispatch = useDispatch();
    const { selectedLocation, locationsList } = useSelector(state => state.locations);
    const userId = useSelector(state => state.userData?._id);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [refetched, setRefetch] = useState(false);

    useEffect(() => {
        if (!locationsList) {
            setIsLoading(true)
            fetchLocations()
                .then(userLocations => {
                    dispatch(setUserLocations(userLocations));
                    isError && setIsError(false);
                })
                .catch(() => { !isError && setIsError(true); })
                .finally(() => {
                    setIsLoading(false)
                    setIsFetched(true)
                });
        } else {
            !isFetched && setIsFetched(true)
        }
    }, [selectedLocation, userId, refetched]);

    return {
        isLoading,
        isError,
        isFetched,
        refetch: () => setRefetch(s => ++s),
        locationsList,
        selectedLocation
    }
}
