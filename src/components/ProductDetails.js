"use client"
import {
    Button, Divider, Grid, Rating,
    List, ListItem, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { addToCart } from "@/dataBase/actions/shoppingCart_slice_actions"
import { addToCart_localy } from "@/dataBase/shoppingCart_slice"
import PriceDisplayer from "@/components/PriceDisplayer";
import ToggleFavorite from "@/components/ToggleFavorite";
import { LoadingButton } from "@mui/lab";
// import CommentsSection from "@/components/CommentsSection";
import { ProductImagesDisplayer } from "@abdulrhmangoni/am-store-library";
import { useRouter } from "next/navigation";
import AvailabationState from "./ProductAvailabationState";


export default function ProductDetails({ product }) {

    const productId = product._id

    const { push } = useRouter();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const shoppingCart = useSelector(state => state.shoppingCart);
    const [isInCart, setAsInCart] = useState(false);
    const [loadingBtn, setLoading] = useState(false);

    const addToShoppingCart = async () => {
        if (userData) {
            setLoading(true);
            await addToCart({ productId, userId: userData._id })
                .then(product => dispatch(addToCart_localy(product)))
            setLoading(false);
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
        <Grid container spacing={{ xs: 1, md: 3 }} sx={{ mb: 2 }}>
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
                            <AvailabationState visitAllAmount amount={product.amount} />
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
    )
    //     product ?
    //         <>
    //             <></>
    //             <CommentsSection />
    //         </> :
    //         statusCode === 404 ? <NotFound productId={productId} /> :
    //             isError ? <Unexpected /> : null
}
