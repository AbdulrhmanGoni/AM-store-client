"use client"
import { useEffect, useState } from 'react';
import {
    Card, CardMedia, Rating, Divider, Box,
    CardContent, CardActions
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
import { P } from "@abdulrhmangoni/am-store-library";


export default function ProductCard({ theProduct, sx }) {

    const { _id, images, title, amount, price, discount } = theProduct;

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
            className='flex-column j-between'
            sx={{ m: 0, ...sx }}>
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
                <P variant="subtitle1" sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: "bold", mb: 1 }}>
                    {title}
                </P>
            </CardContent>
            <Box className="flex-row-center-start" sx={{ p: "0px 8px" }}>
                <Rating precision={0.5} size='small' value={rate} readOnly />
                <P variant='subtitle2' sx={{ margin: "3px 0px 0px 5px" }} fontSize="0.675rem">(46)</P>
            </Box>
            <CardActions
                disableSpacing
                sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-end", p: 1
                }}
            >
                <PriceDisplayer currency="$" price={price} discount={discount} />
                <ProductAvailabationState amount={amount} />
            </CardActions>
            <Divider />
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
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
                        p: .5, pr: 1,
                        "& svg": { width: "1rem" },
                        "& .MuiButton-startIcon": { ml: "3px" },
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