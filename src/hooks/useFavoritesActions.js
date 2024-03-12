import customFetch from "@/utilities/customFetch";
import { toggleFavorites_localy, clearFavorites_localy } from "@/state-management/favorites_slice";
import { useSelector, useDispatch } from 'react-redux';

export default function useFavoritesActions() {

    const userId = useSelector(state => state.userData?._id);
    const dispatch = useDispatch();

    const path = `users/${userId}/favorites`;
    const favoritesSessionId = `am-store-client-favorites-${userId}`
    const setFavorites = async (favorites) => await customFetch(path, "PUT", { favorites });

    const toggleFavorites = async (productId) => await customFetch(path, "POST", { productId });

    const clearFavorites = async () => await customFetch(path, "DELETE");

    function getFavoritesFromSession() {
        const products = sessionStorage.getItem(favoritesSessionId)
        try {
            const parsedProducts = JSON.parse(products)
            return Array.isArray(parsedProducts) ? parsedProducts : []
        } catch {
            return []
        }
    }

    function toggleFavoritesFromSession(theProduct) {
        const products = getFavoritesFromSession();
        let isAlreadyExist = false;
        const updatedArray = products.filter((product) => {
            if (product._id === theProduct._id) {
                isAlreadyExist = true
            }
            return product._id !== theProduct._id
        })

        if (isAlreadyExist) {
            setFavoritesSession(updatedArray)
        } else {
            setFavoritesSession([...updatedArray, theProduct])
        }
        dispatch(toggleFavorites_localy(theProduct._id));
    }

    function clearFavoritesSession() {
        sessionStorage.removeItem(favoritesSessionId)
        dispatch(clearFavorites_localy())
    }

    function setFavoritesSession(products) {
        sessionStorage.setItem(favoritesSessionId, JSON.stringify(products))
    }

    return {
        toggleFavorites,
        setFavorites,
        clearFavorites,
        toggleFavoritesFromSession,
        getFavoritesFromSession,
        clearFavoritesSession,
        setFavoritesSession
    }
}
