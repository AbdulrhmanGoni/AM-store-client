"use client"
import { Divider, Grid, Box, alpha } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { addToCart_localy } from "@/dataBase/shoppingCart_slice"
import ToggleFavorite from "@/components/ToggleFavorite";
import { LoadingButton } from "@mui/lab";
import { ProductImagesDisplayer, ProductAvailabationState, P, PriceDisplayer } from "@abdulrhmangoni/am-store-library";
import { useRouter } from "next/navigation";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";
import useShoppingCartActions from "@/hooks/useShoppingCartActions";
import ProductCommentsSection from "@/components/ProductCommentsSection";
import useAreUserBoughtTheProductBefore from "@/hooks/useAreUserBoughtTheProductBefore";
import ProductRatingSection from "./ProductRatingSection";

export default function ProductDetails({ product }) {

    const { _id: productId, title, price, series, images, description, discount, amount, rating } = product;

    const { push } = useRouter();
    const { addToCart } = useShoppingCartActions();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();

    const userData = useSelector(state => state.userData);
    const shoppingCart = useSelector(state => state.shoppingCart);
    const [isInCart, setAsInCart] = useState(false);
    const [loadingBtn, setLoading] = useState(false);

    function addToShoppingCart() {
        if (userData) {
            setLoading(true);
            addToCart({ productId, userId: userData._id })
                .then(() => dispatch(addToCart_localy(product)))
                .catch(() => message("Adding product failed for unknown reason"))
                .finally(() => setLoading(false))
        } else {
            dispatch(addToCart_localy(product));
        }
    }

    const { areUserBoughtTheProductBefore } = useAreUserBoughtTheProductBefore({ productId });

    useEffect(() => {
        let theProduct = shoppingCart.find(item => item._id === productId);
        if (theProduct) { setAsInCart(true) }
        else { setAsInCart(false) }
    }, [productId, shoppingCart]);

    return (
        <>
            <Box className="flex-column-center-between" sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <ProductImagesDisplayer images={images} />
                    </Grid>
                    <Grid className="flex-column" item xs={12} sm={6} gap={2}>
                        <P variant="h6">{title}</P>
                        <Box className="flex-row-center-start gap1" sx={{ fontSize: "13px" }}>
                            <P fontWeight="bold">Series :</P>
                            <P
                                sx={{
                                    p: "2px 7px",
                                    bgcolor: ({ palette: { primary } }) => alpha(primary.main, .35),
                                    borderRadius: .5
                                }}>
                                {series}
                            </P>
                        </Box>
                        <P>{description}</P>
                        <Box className="flex-row-center-between">
                            <PriceDisplayer discount={discount} currency="$" price={price} />
                            <ProductAvailabationState amount={amount} />
                        </Box>
                        <Box className="flex-row-center-between gap1">
                            <LoadingButton
                                loading={loadingBtn}
                                sx={{ flexBasis: "50%" }}
                                size="small"
                                onClick={isInCart ? () => push("/shopping-cart") : addToShoppingCart}
                                variant="contained"
                                startIcon={isInCart ? <ShoppingCartCheckout /> : <ShoppingCart />}
                            >
                                {isInCart ? "Go To Shopping Cart" : "Add To Cart"}
                            </LoadingButton>
                            <ToggleFavorite productId={productId} />
                        </Box>
                        <Divider />
                        <ProductRatingSection
                            productId={productId}
                            areUserCanLetRating={areUserBoughtTheProductBefore}
                            productRating={rating}
                        />
                    </Grid>
                </Grid>
            </Box>
            <ProductCommentsSection areUserCanComment={areUserBoughtTheProductBefore} />
        </>
    )
}
