import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import customFetch from '@/utilities/customFetch';
import useFavoritesActions from '@/hooks/useFavoritesActions';

export default function useUserFavorites() {

    const {
        clearFavorites,
        getFavoritesFromSession,
        clearFavoritesSession,
        setFavoritesSession
    } = useFavoritesActions();
    const { message } = useSpeedMessage();
    const productsIds = useSelector(state => state.favorites);
    const userId = useSelector(state => state.userData?._id);
    const [products, setProducts] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        const userFavoritesProducts = getFavoritesFromSession()
        if (userFavoritesProducts?.length) {
            setProducts(userFavoritesProducts)
        } else {
            if (productsIds?.length && !isLoading) {
                setLoading(true);
                customFetch("products", "POST", { productsIds })
                    .then(setUserFavoritesProducts)
                    .catch(setError)
                    .finally(() => setLoading(false));
            }
            else { setUserFavoritesProducts([]) }
        }
    }, [])

    function setUserFavoritesProducts(products) {
        setProducts(products);
        setFavoritesSession(products);
    }

    function clear() {
        if (userId) {
            setIsClearing(true);
            clearFavorites()
                .then(clearFavoritesSession)
                .catch(() => { message("Clearing products failed", "error") })
                .finally(() => { setIsClearing(false) })

        } else {
            clearFavoritesSession()
        }
    }

    return {
        products,
        isLoading,
        isError,
        clear,
        isClearing
    }
}
