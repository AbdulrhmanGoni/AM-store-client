"use client";
import { LinearProgress, Rating, Box } from "@mui/material";
import { useEffect, useState } from 'react';
import { P, FetchFailedAlert } from "@abdulrhmangoni/am-store-library";
import useRatingProduct from "@/hooks/useRatingProduct";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import ProductRatingSectionLoading from "./ProductRatingSectionLoading";

export default function ProductRatingSection({ areUserCanLetRating, productId }) {

    const userId = useSelector(state => state.userData?._id);
    const {
        data: ratingDetails,
        isLoading,
        isError,
        refetch
    } = useFetch(`products/${productId}/rating?userId=${userId}`);
    const { rateProduct, ratingLoading } = useRatingProduct({ productId });
    const [productRating, setProductRating] = useState();
    const [userRating, setRating] = useState(0);
    const [loadingReating, setLoadingReating] = useState(0);

    useEffect(() => {
        setProductRating(ratingDetails)
        if (!userRating && ratingDetails?.currentUserRateing) {
            setRating(ratingDetails?.currentUserRateing);
        }
    }, [ratingDetails, userRating])

    return (
        <Box
            className="flex-row-center-between gap2"
            sx={{ flexFlow: "row wrap" }}
        >
            {
                isLoading ? <ProductRatingSectionLoading />
                    : isError ? <FetchFailedAlert message="Failed to fetch rating details" refetch={refetch} />
                        : <>
                            <Box className="flex-column j-between">
                                <Box sx={{ mb: 1.5 }} className="flex-column">
                                    <Box className="flex-row-center-start gap1">
                                        {productRating?.ratingAverage && <P variant="h6">{productRating.ratingAverage}</P>}
                                        {
                                            productRating?.ratingAverage ?
                                                <Rating readOnly precision={.5} value={productRating.ratingAverage} />
                                                : <Rating emptyLabelText="No reviews" readOnly value={0} />
                                        }
                                    </Box>
                                    <P variant="subtitle2" ml={!productRating?.reviews && "3px"}>
                                        {productRating?.reviews ? `Reviews (${productRating?.reviews})` : "No reviews"}
                                    </P>
                                </Box>
                                {
                                    areUserCanLetRating &&
                                    <Box className="flex-column">
                                        <P variant="subtitle2" ml="3px" color="#faaf00">
                                            {userRating ? "Your Rating" : "Let your rating now"}
                                        </P>
                                        <Box
                                            className="flex-row-center-start gap"
                                            sx={{
                                                position: "relative",
                                                width: "fit-content",
                                                pb: 1,
                                            }}
                                        >
                                            <Rating
                                                sx={{ width: "fit-content" }}
                                                value={ratingLoading ? loadingReating : userRating}
                                                disabled={ratingLoading}
                                                onChange={({ target: { value } }) => {
                                                    setLoadingReating(+value)
                                                    rateProduct(+value, () => {
                                                        setRating(+value)
                                                        setLoadingReating(0)
                                                        refetch()
                                                    })
                                                }}
                                            />
                                            {ratingLoading && <LinearProgress sx={{ width: "100%", position: "absolute", bottom: 0 }} />}
                                        </Box>
                                    </Box>
                                }
                            </Box>
                            <Box className="flex-column" gap={.5}>
                                {
                                    productRating ?
                                        [5, 4, 3, 2, 1].map((stars) => {
                                            let { percentage, count } = productRating[starsFieldsNames[stars - 1]] || {};
                                            return (
                                                <Box key={stars + "-stars"} className="flex-row-center-start gap1">
                                                    <P variant="body2">{stars} stars ({count})</P>
                                                    <LinearProgress
                                                        sx={{ width: "100px", height: "8px" }}
                                                        variant="determinate"
                                                        value={percentage}
                                                    />
                                                    <P variant="body2">{percentage}%</P>
                                                </Box>
                                            )
                                        }) : null
                                }
                            </Box>
                        </>
            }
        </Box>
    )
}

const starsFieldsNames = ["oneStar", "twoStars", "threeStars", "fuorStars", "fiveStars"]