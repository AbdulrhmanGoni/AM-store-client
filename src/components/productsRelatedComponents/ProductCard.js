"use client";
import { useEffect, useState } from 'react';
import {
    Card, Rating, Box,
    CardContent, CardActions
} from '@mui/material';
import { AddShoppingCart, ShoppingCartCheckout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import ToggleFavorite from '../ToggleFavorite';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import { addToCart_localy } from '@/state-management/shoppingCart_slice';
import { ProductAvailabationState, P, PriceDisplayer } from '@abdulrhmangoni/am-store-library';
import useShoppingCartActions from '@/hooks/useShoppingCartActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import Image from "next/image";
import ProductCardImageWithHoverLink from './ProductCardImageWithHoverLink';

export default function ProductCard({ theProduct, sx, isBestSelling, applyAnimation, appearingAnimationDelay }) {

    const { _id, images, title, amount, price, discount, rating } = theProduct;

    const { addToCart } = useShoppingCartActions();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();
    const { push } = useRouter();

    const shoppingCart = useSelector(state => state.shoppingCart);
    const userData = useSelector(state => state.userData);
    const [isInCart, setAsInCart] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardOpacity, setCardOpacity] = useState(applyAnimation ? 0 : 1);

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

    useEffect(() => {
        setCardOpacity(1)
    }, []);

    return (
        <Card
            className='flex-column j-between'
            sx={{
                m: 0, ...sx,
                transition: appearingAnimationDelay,
                opacity: cardOpacity
            }}
        >
            <ProductCardImageWithHoverLink
                productId={_id}
                imageSrc={images[0]}
                imageStyle={{
                    height: { xs: 120, sm: 185 },
                    userSelect: "none",
                    objectFit: "contain"
                }}
            />
            <CardContent
                sx={{ p: 1, position: "relative", flex: 1 }}
            >
                {
                    isBestSelling && <Image
                        src="/best-seller-mark.svg"
                        alt="Best seller background image"
                        width={40}
                        height={40}
                        loading="lazy"
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            opacity: 0.1
                        }}
                    />
                }
                <P
                    variant="subtitle1"
                    className='limitationLines2'
                    sx={{
                        fontSize: { xs: 14, sm: 18 },
                        fontWeight: "bold",
                        mb: 1
                    }}
                >
                    {title}
                </P>
                <Box mb={1} className="flex-row-center-start">
                    <Rating precision={0.5} size='small' value={rating?.ratingAverage} readOnly />
                    <P
                        variant='subtitle2'
                        sx={{ margin: "3px 0px 0px 5px" }}
                        fontSize="0.675rem">
                        ({rating?.reviews})
                    </P>
                </Box>
                <Box className="flex-row-center-between a-end gap1">
                    <PriceDisplayer currency="$" price={price} discount={discount} />
                    <ProductAvailabationState amount={amount} />
                </Box>
            </CardContent>
            <CardActions
                disableSpacing
                sx={{
                    justifyContent: "space-between",
                    borderTop: "1px solid",
                    borderTopColor: "divider"
                }}
            >
                <ToggleFavorite theProduct={theProduct} />
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
                        "& .MuiButton-startIcon": { ml: "3px" }
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