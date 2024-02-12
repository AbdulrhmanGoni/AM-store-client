import customFetch from '@/utilities/customFetch';
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import { useSelector } from 'react-redux';

export default function useShoppingCartActions() {

    const userId = useSelector(state => state.userData?._id);
    const path = `users/${userId}/shopping-cart`;

    const setShoppingCart = async (shoppingCart) => {
        const productsIds = shoppingCart.map(product => `${product._id}-${product.count}`);
        return await customFetch(path, "PUT", { productsIds });
    }

    const clearCart = async () => {
        loadingControl(true);
        const data = await customFetch(path, "DELETE", { actionType: "clear" })
        loadingControl(false);
        return data;
    }

    const addToCart = async ({ productId, count }) => {
        return await customFetch(path, "POST", { productId, count })
    }

    const removeFromCart = async (productId) => {
        loadingControl(true);
        const response = await customFetch(path, "DELETE", { productId })
        loadingControl(false);
        return response;
    }

    return {
        addToCart,
        removeFromCart,
        clearCart,
        setShoppingCart
    }
}
