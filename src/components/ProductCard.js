"use client"
import { useEffect, useState } from 'react';
import {
    Card, CardMedia, Rating, Divider, Box,
    CardContent, CardActions, Typography
} from '@mui/material';
import { AddShoppingCart, ShoppingCartCheckout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import PriceDisplayer from './PriceDisplayer';
import ToggleFavorite from './ToggleFavorite';
import OverlayHoverLink from './OverlayHoverLink';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import { addToCart_localy } from '@/dataBase/shoppingCart_slice';
import { ProductAvailabationState } from '@abdulrhmangoni/am-store-library';
import useShoppingCartActions from '@/hooks/useShoppingCartActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';


export default function ProductCard({ theProduct, sx }) {

    const { _id, images, title, amount, price } = theProduct;

    const { addToCart } = useShoppingCartActions();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();
    const { push } = useRouter();

    const shoppingCart = useSelector(state => state.shoppingCart);
    const userData = useSelector(state => state.userData);
    const [rate] = useState(2.5);
    const [isInCart, setAsInCart] = useState(false);
    const [loading, setLoading] = useState(false);


    async function addToShoppingCart() {
        if (userData) {
            setLoading(true);
            addToCart({ productId: _id })
                .then(() => dispatch(addToCart_localy(theProduct)))
                .catch(() => message("Adding product failed for unknown reason"))
                .finally(() => setLoading(false))
        } else {
            dispatch(addToCart_localy(theProduct));
        }
    }

    useEffect(() => {
        if (shoppingCart) {
            let productInCart = shoppingCart.find(item => item._id === _id);
            if (productInCart) { setAsInCart(true); }
            else { setAsInCart(false); }
        }
    }, [_id, shoppingCart]);

    return (
        <Card
            className='flex-column'
            sx={{ m: 0, justifyContent: "space-between", ...sx }}>
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: { xs: 120, sm: 185 },
                        userSelect: "none",
                        objectFit: "contain"
                    }}
                    image={images[0]}
                    alt="product Image">
                </CardMedia>
                <OverlayHoverLink target={`/products/${_id}`} />
            </Box>
            <Divider />
            <CardContent sx={{ p: 1, pb: 0 }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: "bold", mb: 1 }}>
                    {title}
                </Typography>
            </CardContent>
            <Box className="flex-row-center-start" sx={{ p: "0px 8px" }}>
                <Rating precision={0.5} size='small' value={rate} readOnly />
                <Typography variant='subtitle2' sx={{ margin: "3px 0px 0px 5px" }} fontSize="0.675rem">(46)</Typography>
            </Box>
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                <PriceDisplayer currency="$" price={price} />
                <ProductAvailabationState amount={amount} />
            </CardActions>
            <Divider />
            <CardActions disableSpacing sx={{ justifyContent: "space-between", p: 1 }}>
                <ToggleFavorite productId={_id} />
                <LoadingButton
                    disabled={!amount}
                    onClick={() => {
                        if (isInCart) push("/shopping-cart");
                        else addToShoppingCart();
                    }}
                    size='small'
                    sx={{
                        fontSize: { xs: "0.5rem", sm: "0.65rem" },
                        "& svg": { width: { xs: "1rem", sm: "1.2rem" } }
                    }}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={isInCart ? <ShoppingCartCheckout /> : <AddShoppingCart />}
                    variant={isInCart || loading ? "outlined" : "contained"}
                >
                    <span>{isInCart ? "Go To Cart" : "Add To Cart"}</span>
                </LoadingButton>
            </CardActions>
        </Card>
    );
}