import { useEffect } from 'react';
import { useFetch } from './useFetch';
import { useSelector } from 'react-redux';


export default function useAreUserBoughtTheProductBefore({ productId }) {

    const userId = useSelector(state => state.userData?._id);

    const fetchOptions = { fetchCondition: userId && productId }
    const {
        data: response,
        isError,
        refetch,
        refetched,
        isLoading
    } = useFetch(`products/${productId}/are-user-bought-the-product-before?userId=${userId}`, fetchOptions);

    useEffect(() => {
        if (isError && !isLoading && refetched < 3) {
            refetch();
            console.log("refetched")
        }
    }, [isError, refetched, refetch, isLoading]);

    return { areUserBoughtTheProductBefore: response }
}