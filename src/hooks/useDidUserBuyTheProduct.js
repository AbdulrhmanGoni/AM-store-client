import { useEffect } from 'react';
import { useFetch } from './useFetch';
import { useSelector } from 'react-redux';


export default function useDidUserBuyTheProduct({ productId }) {

    const userId = useSelector(state => state.userData?._id);

    const fetchOptions = { fetchCondition: userId && productId }
    const {
        data: response,
        isError,
        refetch,
        refetched,
        isLoading
    } = useFetch(`products/${productId}/did-user-buy-the-product?userId=${userId}`, fetchOptions);

    useEffect(() => {
        if (isError && !isLoading && refetched < 3) {
            refetch();
        }
    }, [isError, refetched, refetch, isLoading]);

    return {
        didUserBuyTheProduct: response,
        didUserBuyTheProductLoading: isLoading,
        didUserBuyTheProductError: isError
    }
}