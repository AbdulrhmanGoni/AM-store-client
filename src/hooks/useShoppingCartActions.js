import customFetch from '@/functions/customFetch';
import { loadingControl } from '@abdulrhmangoni/am-store-library';

export default function useShoppingCartActions() {

    const path = id => `users/${id}/shopping-cart`;

    const setShoppingCart = async ({ userId, shoppingCart }) => {
        return await customFetch(path(userId), "POST", { shoppingCart, type: "set_new_cart" });
    }

    const fetchShoppingCart =  async (userId) => {
        return await customFetch(path(userId));
    }

    const clearCart = async (userId) => {
        loadingControl(true);
        const data = await customFetch(path(userId), "DELETE", { type: "clear" })
        loadingControl(false);
        return data;
    }

    const addToCart = async ({ userId, productId, count }) => {
        return await customFetch(path(userId), "POST", { productId, count, type: "add_Item" })
    }

    const removeFromCart = async ({ userId, productId }) => {
        loadingControl(true);
        const response = await customFetch(path(userId), "DELETE", { productId })
        loadingControl(false);
        return response;
    }

    return {
        addToCart,
        removeFromCart,
        clearCart,
        setShoppingCart,
        fetchShoppingCart
    }
}
