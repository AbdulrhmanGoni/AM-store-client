import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useCookies, useHTTPRequestState } from "@abdulrhmangoni/am-store-library";
import customFetch from "@/utilities/customFetch";
import { setUserData } from '@/state-management/userData_slice';
import { setCart_localy } from '@/state-management/shoppingCart_slice';
import { setFavorites_localy } from '@/state-management/favorites_slice';
import useStoreVariablesFetcher from './useStoreVariablesFetcher';

export default function useUserLogging() {

    const dispatch = useDispatch();
    const { cookies: { userId } } = useCookies();
    const {
        isLoading,
        isError,
        setIsError,
        setIsLoading
    } = useHTTPRequestState();
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isServerError, setIsServerError] = useState(false);
    const [renderApp, setRendrApp] = useState(false);
    const { isLoading: fetchVariablesLoading, isError: fetchVariablesError } = useStoreVariablesFetcher();

    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            customFetch(`log-in/${userId}`)
                .then(data => {
                    dispatch(setUserData({ ...data.userData, state: true }));
                    dispatch(setCart_localy(data.shoppingCart));
                    dispatch(setFavorites_localy(data.favorites));
                    isError && setIsError(false);
                })
                .catch((error) => {
                    if (!navigator.onLine) {
                        setIsNetworkError(true);
                    } else if (!error.response?.status) {
                        setIsServerError(true);
                    } else {
                        setIsError(true);
                    }
                })
                .finally(() => setIsLoading(false));
        }
        setRendrApp(true)
    }, [userId]);


    return {
        isLoading: isLoading || fetchVariablesLoading,
        isNetworkError,
        isError: isError || fetchVariablesError,
        isServerError,
        renderApp
    }
}
