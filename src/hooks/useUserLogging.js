import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import useFetchState from './useFetchState';
import customFetchFunc from "@/functions/customFetch";
import { setUserData } from '@/state-management/userData_slice';
import { setCart_localy } from '@/state-management/shoppingCart_slice';
import { setFavorites_localy } from '@/state-management/favorites_slice';

export default function useUserLogging() {

    const dispatch = useDispatch();
    const [cookies] = useCookies();
    const { isLoading, isError, setState } = useFetchState(null);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isServerError, setIsServerError] = useState(false);
    const [isUnexpected, setIsUnexpected] = useState(false);
    const [renderApp, setRendrApp] = useState(false);

    useEffect(() => {
        const userId = cookies.userId;
        if (userId) {
            setState("loading");
            customFetchFunc(`log-in/${userId}`)
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
                    } else setIsUnexpected(true);
                })
                .finally(() => setState());
        }
        setRendrApp(true)
    }, []);

    return {
        isLoading,
        isNetworkError,
        isError,
        isServerError,
        isUnexpected,
        renderApp
    }
}
