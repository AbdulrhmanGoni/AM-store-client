import { useEffect, useState } from 'react';
import {
    Card, CardMedia, Rating, Divider, Alert,
    CardContent, CardActions, InputAdornment,
    Typography, Box, Button, Paper, FormControl,
    Input, InputLabel, Skeleton
} from '@mui/material';
import { AddShoppingCart, Delete, ShoppingCartCheckout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart_localy, removeFromCart_localy } from "../dataBase/shoppingCart_slice"
import { addToCart, removeFromCart } from "../dataBase/actions/shoppingCart_slice_actions"
import PriceDisplayer from './PriceDisplayer';
import ToggleFavorite from './ToggleFavorite';
import OverlayHoverLink from './OverlayHoverLink';
import { useNavigate } from 'react-router-dom';
import ShoppingCartController from './ShoppingCartController';
import { LoadingButton } from '@mui/lab';
import { ActionAlert } from '@abdulrhmangoni/am-store-library';


export default function ProductCard({ theProduct, sx }) {

    const { _id, images, title, amount, price } = theProduct;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shoppingCart, userData } = useSelector(state => state);
    const [rate, setRate] = useState(2.5);
    const [isInCart, setAsInCart] = useState(false);
    const [loading, setLoading] = useState(false);


    async function addToShoppingCart() {
        if (userData) {
            setLoading(true);
            await addToCart({ productId: _id, userId: userData._id })
                .then(product => dispatch(addToCart_localy(product)));
            setLoading(false);
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
    }, [shoppingCart]);

    return (
        <Card
            sx={{
                m: 0, display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ...sx,
            }}>
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
                <OverlayHoverLink target={`/product-details/${_id}`} />
            </Box>
            <Divider />
            <CardContent sx={{ p: 1, pb: 0 }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: 14, sm: 18 }, fontWeight: "bold", mb: 1 }}>
                    {title}
                </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", p: "0px 8px" }}>
                <Rating name="half-rating-read" precision={0.5} size='small' value={rate} readOnly />
                <Typography variant='subtitle2' sx={{ margin: "3px 0px 0px 5px" }} fontSize="0.675rem">(46)</Typography>
            </Box>
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                <PriceDisplayer currency="$" price={price} />
                <AvailabationState amount={amount} />
            </CardActions>
            <Divider />
            <CardActions disableSpacing sx={{ justifyContent: "space-between", p: 1 }}
            >
                <ToggleFavorite productId={_id} />
                <LoadingButton
                    disabled={!amount}
                    onClick={() => {
                        if (isInCart) navigate("/shopping-cart");
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

export function InitialCard({ cardWidth }) {

    return (
        <Card
            sx={{
                m: 0, gap: 1,
                width: cardWidth,
                display: "flex",
                flexDirection: "column"
            }}>
            <Skeleton variant="rectangular" sx={{ height: { xs: 120, sm: 185 } }} />
            <Box sx={{ display: "flex", flexDirection: "column", p: "0px 8px", gap: 1 }}>
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" sx={{ height: 15, width: "75%" }} />
                <Skeleton variant="rectangular" sx={{ height: 32 }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", p: "0px 8px 8px" }}>
                <Skeleton variant="rounded" sx={{ height: 30, width: 30 }} />
                <Skeleton variant="rounded" sx={{ height: 30, width: 75 }} />
            </Box>
        </Card>
    );
}

export function WidthlyCard({ id, image, title, description, price, amount, actionSec = true, imgWidth, displayCount, noPrice }) {

    const dispatch = useDispatch();
    const { userData } = useSelector(state => state);
    const [rate, setRate] = useState(3.5);

    function deleteFromShoppingCart() {
        if (userData) {
            dispatch(removeFromCart({ productId: id, userId: userData._id }));
        } else {
            dispatch(removeFromCart_localy(id));
        }
    }

    return (
        <Card elevation={1}
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%", gap: 2, p: 1,
                position: "relative"
            }}>
            <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }} >
                <CardMedia
                    component="img"
                    src={image}
                    alt={id}
                    style={{
                        height: "100%",
                        width: imgWidth ?? "200px",
                        objectFit: "contain"
                    }}
                />
                <OverlayHoverLink target={`/product-details/${id}`} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant='h6'>{title}</Typography>
                <Typography className='limitationLines2' variant='body1'>{description}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 3 }}>
                    <Box>
                        {!noPrice && <PriceDisplayer currency="$" price={price} />}
                        <Typography variant='subtitle2' sx={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <Rating precision={0.5} size='small' value={rate} readOnly /> (82)
                        </Typography>
                    </Box>
                    {
                        displayCount &&
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Amount</InputLabel>
                            <Input defaultValue={displayCount} disabled sx={{ width: "80px" }}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    }
                    <ToggleFavorite productId={id} />
                </Box>
                {actionSec && <>
                    <Divider sx={{ m: "5px 0px" }} />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 3 }}>
                        <ShoppingCartController productId={id} />
                        <Box sx={{ flexGrow: 1 }}>
                            {!amount && <AvailabationState style={{ width: "fit-content" }} amount={amount} />}
                        </Box>
                        <ActionAlert
                            title="Remove product from cart"
                            message="You going to remove this product from shopping cart, Are you sure?"
                            action={deleteFromShoppingCart}
                        >
                            <Button
                                endIcon={<Delete />}
                                sx={{ alignItems: "flex-start" }}
                                color="error" aria-label="Delete From Shopping Cart">
                                delete
                            </Button>
                        </ActionAlert>
                    </Box>
                </>}
            </Box>
        </Card>
    );
}

export function SmallCard({ theProduct }) {

    const [rate, setRate] = useState(3.5);

    return (
        <Paper elevation={1} sx={{ display: "flex", gap: 1, p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <CardMedia
                    component="img"
                    src={theProduct.images[0]}
                    alt={theProduct._id}
                    style={{
                        height: "100px",
                        width: "120px",
                        objectFit: "contain"
                    }}
                />
                <OverlayHoverLink linkStyle={{ fontSize: "12px" }} target={`/product-details/${theProduct._id}`} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant='subtitle2' className='limitationLines1'>{theProduct.title}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <PriceDisplayer style={{ fontSize: "1rem" }} variant="subtitle2" currency="$" price={theProduct.price} />
                    <Typography variant='body2'>Items({theProduct.count})</Typography>
                </Box>
                <Rating name="half-rating-read" precision={0.5} size='small' value={rate} readOnly />
            </Box>
        </Paper>
    );
}

export function AvailabationState({ amount, visitAllAmount, style }) {

    let howManyLeft = () => {
        if (visitAllAmount) {
            return !amount ? "Out Of Stock" : amount < 4 ? `Only: ${amount} Left` : amount < 10 ? `${amount} Left` : "Available"
        } else {
            return amount ? `Only: ${amount} Left` : "Out Of Stock"
        }
    }

    return (amount < 4 || visitAllAmount ?
        <Alert
            icon={false} color={amount > 3 ? "info" : amount ? "warning" : "error"}
            sx={{ p: "5px 8px", "& div": { p: 0 }, ...style }}>
            <Typography
                sx={{ fontSize: { xs: "0.600rem", sm: "0.800rem" } }}
                variant='subtitle2'>
                {howManyLeft()}
            </Typography>
        </Alert> : null
    )
}
