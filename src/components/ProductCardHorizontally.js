import { useState } from 'react';
import {
    Card, CardMedia, Rating, Divider,
    Input, Typography, Box, Button, FormControl,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart_localy } from "@/dataBase/shoppingCart_slice"
import {  removeFromCart } from "@/dataBase/actions/shoppingCart_slice_actions"
import PriceDisplayer from './PriceDisplayer';
import ToggleFavorite from './ToggleFavorite';
import OverlayHoverLink from './OverlayHoverLink';
import ShoppingCartController from './ShoppingCartController';
import { ActionAlert, ProductAvailabationState } from '@abdulrhmangoni/am-store-library';


export default function ProductCardHorizontally(props) {

    let { id, images, title, description, price, amount, actionSec = true, imgWidth, displayCount, noPrice } = props

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
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
            <Box className="flex-center" position="relative" >
                <CardMedia
                    component="img"
                    src={images[0]}
                    alt={id}
                    sx={{
                        height: "100%",
                        maxHeight: "155px",
                        width: imgWidth ?? "200px",
                        objectFit: "contain"
                    }}
                />
                <OverlayHoverLink target={`/products/${id}`} />
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
                            <Input
                                defaultValue={displayCount} disabled sx={{ width: "80px" }}
                                startAdornment={<Typography sx={{ fontSize: ".8rem", mr: .8 }}>Quantity</Typography>}
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
                            {!amount && <ProductAvailabationState style={{ width: "fit-content" }} amount={amount} />}
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