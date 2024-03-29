import customFetch from '@/utilities/customFetch';
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
        const { reviews, ratingAverage, currentUserRating } = productRating;
        const isFirstReview = !currentUserRating
        const totalStars = ratingAverage * reviews;
        const updatedTotalStars = totalStars + (newRating - currentUserRating)
        productRating.reviews += isFirstReview ? 1 : 0
        productRating.currentUserRating = newRating
        updateStarsPercentage(currentUserRating, newRating)
        productRating.ratingAverage = +(updatedTotalStars / productRating.reviews).toFixed(1)
        setProductRating(productRating)
    }

    function updateStarsPercentage(pastRateing, newRating) {
        if (pastRateing) {
            const pastStar = starsFieldsNames[pastRateing - 1]
            --productRating[pastStar].count
            productRating[pastStar].percentage = calcPercentage(pastStar)
        }

        const newStar = starsFieldsNames[newRating - 1]
        ++productRating[newStar].count
        productRating[newStar].percentage = calcPercentage(newStar)

        starsFieldsNames.forEach((startField) => {
            if (startField !== newStar && startField !== starsFieldsNames[pastRateing - 1]) {
                productRating[startField].percentage = calcPercentage(startField)
            }
        })
    }

    function calcPercentage(startField) {
        return +((productRating[startField].count / productRating.reviews) * 100).toFixed(1)
    }

    return {
        ratingLoading,
        productRating: productRating || {},
        userRating: productRating?.currentUserRating,
        fetchingLoading: isLoading,
        fetchingError: isError,
        refetch,
        addRating
    }
}

export const starsFieldsNames = ["oneStar", "twoStars", "threeStars", "fuorStars", "fiveStars"]
