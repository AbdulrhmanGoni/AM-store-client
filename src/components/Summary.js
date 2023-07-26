import { Box, Button, Divider, List, ListItem, Paper, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TotalPriceInCart from './TotalPriceInCart'
import PriceDisplayer from './PriceDisplayer'
import { Close, Discount, Done } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import deliveryPrice, { includeLimit } from '../CONSTANT/deliveryPrice'
import { discountCobone, setSummaryPrice } from '../dataBase/checkoutSummary_slice'
import { applyDiscount, discountDecorator } from '../dataBase/Categories/cobones'
import { getcobones } from '../dataBase/actions/cobones_slice_actions'

export default function Summary() {

    const media = useMediaQuery("(max-width: 600px)");

    const dispatch = useDispatch();

    const { cobones, shoppingCart } = useSelector(state => state);
    const shoppingCartItems = shoppingCart.length;
    const totalPriceInCart = shoppingCart.reduce((acc, current) => acc + current.price * current.count, 0);
    const { checkoutSummary: { totalPrice, discountCobone: usedCobone } } = useSelector(state => state);

    const [isValidCobone, setCoboneState] = useState(true);
    const [discount, setDiscount] = useState(null);
    const [includeDeliveryPrice, setDeliveryPriceState] = useState(true);


    useEffect(() => {
        checkCobone(usedCobone);
        handleCheckoutSummary();
    }, [totalPriceInCart, discount]);

    useEffect(() => {
        if (!cobones) {
            dispatch(getcobones());
        }
    }, []);

    function handleCheckoutSummary() {
        let total = applyDiscount(totalPriceInCart, discount);
        if (total < includeLimit) {
            total += deliveryPrice;
            setDeliveryPriceState(true);
        }
        else {
            setDeliveryPriceState(false);
        }
        dispatch(setSummaryPrice(total));
    }

    function checkCobone(cobone) {
        if (cobones) {
            if (cobones[cobone]) {
                setCoboneState(true);
                setDiscount(cobones[cobone]);
                return true;
            } else {
                return false;
            }
        }
    }

    function handleCoboneField() {
        const coboneInput = document.getElementById("discountCobone").value;
        if (coboneInput.length > 0) {
            if (!checkCobone(coboneInput)) {
                setCoboneState(false);
            }
            dispatch(discountCobone(coboneInput));
        }
    }

    function resetCoboneField() {
        setCoboneState(true);
        setDiscount(null);
        dispatch(discountCobone(null));
    }

    const TextTitle = ({ children, style }) => {
        return (
            <Typography sx={style} fontWeight="bold" variant={media ? "subtitle2" : "subtitle1"} >
                {children}
            </Typography>
        )
    }

    const Li = ({ children, style }) => {
        return (
            <ListItem sx={{ display: 'flex', justifyContent: "space-between", p: 1, ...style }}>
                {children}
            </ListItem>
        )
    }

    const priceStyle = { fontSize: media ? "15px" : "16px" }

    return (
        <Paper elevation={1}>
            <List sx={{ display: "flex", flexDirection: "column", p: "0px 8px", gap: 1, width: "100%" }}>
                <ListItem sx={{ p: 1 }}>
                    <Typography variant='h6'>Summary</Typography>
                </ListItem>
                <Divider />
                <Li>
                    <TextTitle>Items ({shoppingCartItems})</TextTitle>
                    {<TotalPriceInCart style={priceStyle} />}
                </Li>
                {
                    discount &&
                    <Li>
                        <TextTitle style={{ color: "primary.main" }}>discount: {discountDecorator(discount)}</TextTitle>
                        <PriceDisplayer price={totalPriceInCart * discount} operation="-" />
                    </Li>
                }
                <Li>
                    <TextTitle>Delivery:</TextTitle>
                    {
                        includeDeliveryPrice ? <PriceDisplayer price={deliveryPrice} operation={"+"} style={priceStyle} /> :
                            <Typography sx={{ color: "primary.main" }} variant='body2'>Free</Typography>
                    }
                </Li>
                <Li>
                    <TextTitle style={{ color: "red", fontSize: "21px" }}>Total:</TextTitle>
                    <PriceDisplayer price={totalPrice} style={{ ...priceStyle, color: "red", fontSize: "20px" }} />
                </Li>
                <Divider />
                <Li style={{ pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: "1" }}>
                        <Discount sx={{ color: 'primary.main', mr: 1, my: 0.5, fontSize: "1rem" }} />
                        <TextField
                            error={!isValidCobone}
                            defaultValue={usedCobone}
                            disabled={discount ? true : false}
                            helperText={!isValidCobone ? "The Cobone Is Invalid" : ""}
                            id="discountCobone"
                            label="Cobone"
                            variant="standard"
                            sx={{ flexGrow: "1" }}
                        />
                    </Box>
                    <Button variant='contained' sx={{ ml: 2, p: 0, minWidth: "40px", alignSelf: "flex-end" }} >
                        {
                            discount ?
                                <Close onClick={resetCoboneField} />
                                :
                                <Done onClick={handleCoboneField} />
                        }
                    </Button>
                </Li>
            </List>
        </Paper>
    )
}
