import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useCookies } from "@abdulrhmangoni/am-store-library";
import useFetchState from './useFetchState';
import customFetch from "@/utilities/customFetch";
import { setUserData } from '@/state-management/userData_slice';
import { setCart_localy } from '@/state-management/shoppingCart_slice';
import { setFavorites_localy } from '@/state-management/favorites_slice';
import useStoreVariablesFetcher from './useStoreVariablesFetcher';

export default function useUserLogging() {

    const dispatch = useDispatch();
    const { cookies: { userId } } = useCookies();
    const { isLoading, isError, setState } = useFetchState(null);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isServerError, setIsServerError] = useState(false);
    const [renderApp, setRendrApp] = useState(false);
    const { isLoading: fetchVariablesLoading } = useStoreVariablesFetcher();

    useEffect(() => {
        if (userId) {
            setState("loading");
            customFetch(`log-in/${userId}`)
                .then(data => {
                    dispatch(setUserData({ ...data.userData, state: true }));
                    dispatch(setCart_localy(data.shoppingCart));
                    dispatch(setFavorites_localy(data.favorites));
                    setState("fulfilled");
                })
                .catch((error) => {
                    if (!navigator.onLine) {
                        setIsNetworkError(true);
                    } else if (!error.response?.status) {
                        setIsServerError(true);
                    }
                })
                .finally(() => setState());
        }
        setRendrApp(true)
    }, [userId]);


    return {
        isLoading: !!(isLoading || fetchVariablesLoading),
        isNetworkError,
        isError,
        isServerError,
        renderApp
    }
}
