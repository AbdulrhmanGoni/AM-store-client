"use client"
import {
    Button, Divider, Grid, Rating,
    List, ListItem, Typography, Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { addToCart_localy } from "@/dataBase/shoppingCart_slice"
import PriceDisplayer from "@/components/PriceDisplayer";
import ToggleFavorite from "@/components/ToggleFavorite";
import { LoadingButton } from "@mui/lab";
import { ProductImagesDisplayer, ProductAvailabationState } from "@abdulrhmangoni/am-store-library";
import { useRouter } from "next/navigation";
import { useSpeedMessage } from "@/hooks/useSpeedMessage";
import useShoppingCartActions from "@/hooks/useShoppingCartActions";
import CommentsSection from "@/components/ProductCommentsSection";


export default function ProductDetails({ product }) {

    const productId = product._id

    const { push } = useRouter();
    const { addToCart } = useShoppingCartActions();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();

    const userData = useSelector(state => state.userData);
    const shoppingCart = useSelector(state => state.shoppingCart);
    const [isInCart, setAsInCart] = useState(false);
    const [loadingBtn, setLoading] = useState(false);

    const addToShoppingCart = async () => {
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

    useEffect(() => {
        let theProduct = shoppingCart.find(item => item._id === productId);
        if (theProduct) { setAsInCart(true) }
        else { setAsInCart(false) }
    }, [productId, shoppingCart]);

    return (
        <>
            <Box
                sx={{ height: "calc(100vh - 57px - 25px)", }}
                className="flex-column-center-between"
            >
                <Grid container spacing={{ xs: 1, md: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <ProductImagesDisplayer images={product.images} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <List disablePadding>
                            <ListItem>
                                <Typography variant="h6">{product.title}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Series: {product.series}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>{product.description}</Typography>
                            </ListItem>
                            <ListItem>
                                <PriceDisplayer currency="$" price={product.price} />
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography variant='subtitle2' sx={{
                                    fontSize: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <Rating precision={0.5} size='small' value={3.5} readOnly /> (82)
                                </Typography>
                                <ToggleFavorite productId={productId} />
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography variant='subtitle2' sx={{
                                    fontSize: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <ProductAvailabationState visitAllAmount amount={product.amount} />
                                </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding sx={{ gap: 1, justifyContent: "space-between", mt: 1 }}>
                                {
                                    isInCart ?
                                        <Button
                                            sx={{ width: "100%" }}
                                            size="small" variant="contained"
                                            onClick={() => push("/shopping-cart")}
                                            startIcon={<ShoppingCartCheckout />}>
                                            Go To Shopping Cart
                                        </Button>
                                        :
                                        <LoadingButton loading={loadingBtn} sx={{ width: "100%" }} size="small" onClick={addToShoppingCart} variant="contained" startIcon={<ShoppingCart />}>
                                            Add To Cart
                                        </LoadingButton>
                                }
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
            <CommentsSection />
        </>
    )
}
