import customFetch from '@/functions/customFetch';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from './useSpeedMessage';

export default function useRatingProduct({ productId }) {

    const userId = useSelector(state => state.userData?._id);
    const { message } = useSpeedMessage();
    const [ratingLoading, setLoading] = useState(false);

    function rateProduct(rate, onSuccess) {
        setLoading(true);
        customFetch(`products/${productId}/rating`, "POST", { rate, userId })
            .then(() => {
                message("Adding your rating done successfully.", "success");
                onSuccess?.();
            })
            .catch(() => { message("Adding your rating failed for unknown reason") })
            .finally(() => setLoading(false))
    }

    return { ratingLoading, rateProduct }
}
