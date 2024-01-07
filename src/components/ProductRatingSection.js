"use client";
import { LinearProgress, Rating, Box } from "@mui/material";
import { P, FetchFailedAlert } from "@abdulrhmangoni/am-store-library";
import useRatingProduct, { starsFieldsNames } from "@/hooks/useRatingProduct";
import ProductRatingSectionLoading from "./ProductRatingSectionLoading";

export default function ProductRatingSection({ areUserCanLetRating, productId }) {

    const {
        ratingLoading,
        productRating,
        userRating,
        fetchingLoading,
        fetchingError,
        refetch,
        addRating
    } = useRatingProduct({ productId });

    const { ratingAverage } = productRating || {}

    return (
        <Box
            className="flex-row j-between gap2"
            sx={{ flexFlow: "row wrap" }}
        >
            {
                fetchingLoading ? <ProductRatingSectionLoading />
                    : fetchingError ? <FetchFailedAlert message="Failed to fetch rating details" refetch={refetch} />
                        : <>
                            <Box className="flex-column j-between">
                                <Box sx={{ mb: 1.5 }} className="flex-column">
                                    <Box className="flex-row-center-start gap1">
                                        {ratingAverage && <P variant="h6">{ratingAverage}</P>}
                                        {
                                            ratingAverage ?
                                                <Rating readOnly precision={.5} value={ratingAverage} />
                                                : <Rating emptyLabelText="No reviews" readOnly value={0} />
                                        }
                                    </Box>
                                    <P variant="subtitle2" ml={!reviews && "3px"}>
                                        {reviews ? `Reviews (${reviews})` : "No reviews"}
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
                                                value={ratingLoading.isLoading ? ratingLoading.newRating : userRating}
                                                disabled={ratingLoading.isLoading}
                                                onChange={({ target: { value } }) => {
                                                    addRating(+value)
                                                }}
                                            />
                                            {ratingLoading.isLoading && <LinearProgress sx={{ width: "100%", position: "absolute", bottom: 0 }} />}
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
