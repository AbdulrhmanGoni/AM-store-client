import customFetch from '@/functions/customFetch';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from './useSpeedMessage';
import { useFetch } from './useFetch';

export default function useRatingProduct({ productId }) {

    const userId = useSelector(state => state.userData?._id);
    const { message } = useSpeedMessage();
    const {
        data: ratingDetails,
        isLoading,
        isError,
        refetch
    } = useFetch(`products/${productId}/rating?userId=${userId}`);

    const [productRating, setProductRating] = useState();
    const [ratingLoading, setRatingLoading] = useState({ isLoading: false, newRating: 0 });

    useEffect(() => {
        setProductRating(ratingDetails);
    }, [ratingDetails])

    function addRating(rate) {
        setRatingLoading({ isLoading: true, newRating: rate });
        customFetch(`products/${productId}/rating`, "POST", { rate, userId })
            .then(() => {
                message("Adding your rating done successfully", "success");
                updateProductRating(rate);
            })
            .catch((err) => {
                console.log(err)
                message("Adding your rating failed for unknown reason")
            })
            .finally(() => setRatingLoading({ isLoading: false, newRating: 0 }))
    }

    function updateProductRating(newRating) {
        const { reviews, ratingAverage, currentUserRateing } = productRating;
        const isFirstReview = !currentUserRateing
        const totalStars = ratingAverage * reviews;
        const updatedTotalStars = totalStars + (newRating - currentUserRateing)
        productRating.reviews += isFirstReview ? 1 : 0
        productRating.currentUserRateing = newRating
        updateStarsPercentage(currentUserRateing, newRating, productRating.reviews)
        productRating.ratingAverage = +(updatedTotalStars / productRating.reviews).toFixed(0)
        setProductRating(productRating)
    }

    function updateStarsPercentage(pastRateing, newRating, totalReviews) {
        if (pastRateing) {
            const pastStar = starsFieldsNames[pastRateing - 1]
            const pastCount = --productRating[pastStar].count
            productRating[pastStar].percentage = +((pastCount / totalReviews) * 100).toFixed(0)
        }

        const newStar = starsFieldsNames[newRating - 1]
        const newCount = ++productRating[newStar].count
        productRating[newStar].percentage = +((newCount / totalReviews) * 100).toFixed(0)
    }

    return {
        ratingLoading,
        productRating: productRating || {},
        userRating: productRating?.currentUserRateing,
        fetchingLoading: isLoading,
        fetchingError: isError,
        refetch,
        addRating
    }
}

export const starsFieldsNames = ["oneStar", "twoStars", "threeStars", "fuorStars", "fiveStars"]
