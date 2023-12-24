import { useState } from 'react';
import {
    Card, CardMedia, Rating, Divider,
    Input, Box, Button, FormControl,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart_localy } from "@/dataBase/shoppingCart_slice"
import ToggleFavorite from './ToggleFavorite';
import OverlayHoverLink from './OverlayHoverLink';
import ProductCountInCart from './ProductCountInCart';
import { ActionAlert, ProductAvailabationState, P, PriceDisplayer } from '@abdulrhmangoni/am-store-library';
import useShoppingCartActions from '@/hooks/useShoppingCartActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';


export default function ProductCardHorizontally(props) {

    let { theProduct, actionsSec = true, imgWidth, displayCount, withoutPrice } = props;
    let { _id: id, images, title, description, price, discount, amount } = theProduct;

    const { removeFromCart } = useShoppingCartActions();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();
    const userData = useSelector(state => state.userData);
    const [rate, setRate] = useState(3.5);

    function deleteFromShoppingCart() {
        if (userData) {
            removeFromCart(id)
                .then(() => dispatch(removeFromCart_localy(id)))
                .catch(() => message("Removing product failed for unknown reason"))
        } else {
            dispatch(removeFromCart_localy(id));
        }
    }

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%", gap: 2, p: 1,
                position: "relative"
            }}>
            <Box
                className="flex-center"
                bgcolor={({ palette: { mode } }) => mode === "light" ? "black" : "white"}
                position="relative"
            >
                <CardMedia
                    component="img"
                    src={images[0]}
                    alt={id}
                    sx={{
                        height: "100%",
                        maxHeight: "185px",
                        width: imgWidth ?? "185px",
                        objectFit: "contain"
                    }}
                />
                <OverlayHoverLink target={`/products/${id}`} />
            </Box>
            <Box className="flex-column gap1 j-between" sx={{ flexGrow: 1 }}>
                <P variant='h6'>{title}</P>
                <P className='limitationLines2' variant='body1'>{description}</P>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 3 }}>
                    <Box>
                        {!withoutPrice && <PriceDisplayer discount={discount} currency="$" price={price} />}
                        <P variant='subtitle2' sx={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <Rating precision={0.5} size='small' value={rate} readOnly /> (82)
                        </P>
                    </Box>
                    {
                        displayCount &&
                        <FormControl fullWidth variant="standard">
                            <Input
                                defaultValue={displayCount} disabled sx={{ width: "80px" }}
                                startAdornment={<P sx={{ fontSize: ".8rem", mr: .8 }}>Quantity</P>}
                            />
                        </FormControl>
                    }
                    <ToggleFavorite productId={id} />
                </Box>
                {actionsSec && <>
                    <Divider sx={{ m: "5px 0px" }} />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 3 }}>
                        <ProductCountInCart productId={id} />
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