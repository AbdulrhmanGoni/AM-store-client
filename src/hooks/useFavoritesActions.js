import customFetch from "@/functions/customFetch";
import { useSelector } from 'react-redux';

export default function useFavoritesActions() {

    const userId = useSelector(state => state.userData?._id);

    const path = `users/${userId}/favorites`;

    const setFavorites = async (favorites) => await customFetch(path, "POST", { favorites, type: "setNewFavorites" });

    const toggleFavorites = async (productId) => await customFetch(path, "POST", { productId, type: "toggle" });

    const clearFavorites = async () => await customFetch(path, "DELETE");

    return {
        toggleFavorites,
        setFavorites,
        clearFavorites
    }
}
