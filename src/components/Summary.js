"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, List, ListItem, Paper, TextField, useMediaQuery, Skeleton } from '@mui/material'
import { Close, Discount, Done } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { includeDiscount, setSummaryPrice, removeDiscount } from '@/state-management/checkoutSummary_slice'
import fetchDiscountCobones from '@/utilities/fetchDiscountCobones'
import { setDiscountCobones } from '@/state-management/cobones_slice'
import calculateShoppingCartSum from '@/utilities/calculateShoppingCartSum'
import { P, PriceDisplayer, applyDiscount } from "@abdulrhmangoni/am-store-library";


export default function Summary() {

    const media = useMediaQuery("(max-width: 600px)");

    const dispatch = useDispatch();

    const shoppingCart = useSelector(state => state.shoppingCart);
    const cobones = useSelector(state => state.cobones);
    const { totalPrice, discountCobone } = useSelector(state => state.checkoutSummary);
    const { deliveryPrice, minFreeDeliveryEntitlementPrice } = useSelector(state => state.variables);
    const totalPriceInCart = calculateShoppingCartSum(shoppingCart);
    const [isValidCobone, setCoboneState] = useState(true);
    const [discount, setDiscount] = useState(null);
    const [isFetchingDiscountCobones, setIsFetchingDiscountCobones] = useState(false);
    const [includeDeliveryPrice, setDeliveryPriceState] = useState(true);


    useEffect(() => {
        checkCobone(discountCobone);
        let total = applyDiscount(totalPriceInCart, discount);
        if (total < minFreeDeliveryEntitlementPrice) {
            total += deliveryPrice;
            setDeliveryPriceState(true);
        }
        else {
            setDeliveryPriceState(false);
        }
        dispatch(setSummaryPrice(total));

    }, [totalPriceInCart, discount, discountCobone, deliveryPrice, minFreeDeliveryEntitlementPrice]);

    useEffect(() => {
        if (!cobones) {
            setIsFetchingDiscountCobones(true);
            fetchDiscountCobones()
                .then((cobone) => dispatch(setDiscountCobones(cobone)))
                .catch(() => { })
                .finally(() => setIsFetchingDiscountCobones(false))
        }
    }, []);

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
        const coboneInput = document.getElementById("discountCoboneField").value;
        if (coboneInput.length > 0) {
            if (!checkCobone(coboneInput)) {
                setCoboneState(false);
            }
            dispatch(includeDiscount(coboneInput));
        }
    }

    function resetCoboneField() {
        setCoboneState(true);
        setDiscount(null);
        dispatch(includeDiscount(null));
    }

    const TextTitle = ({ children, style }) => {
        return (
            <P sx={style} fontWeight="bold" variant={media ? "subtitle2" : "subtitle1"} >
                {children}
            </P>
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
        <Paper>
            <List className='flex-column gap1 full-width' sx={{ p: "0px 8px" }}>
                <ListItem sx={{ p: 1 }}>
                    <P variant='h6'>Summary</P>
                </ListItem>
                <Divider />
                <Li>
                    <TextTitle>Items ({shoppingCart.length})</TextTitle>
                    <PriceDisplayer price={totalPriceInCart} style={priceStyle} />
                </Li>
                {
                    discount &&
                    <Li>
                        <TextTitle style={{ color: "primary.main" }}>discount: {discount * 100}%</TextTitle>
                        <PriceDisplayer price={totalPriceInCart * discount} operator="-" />
                    </Li>
                }
                <Li>
                    <TextTitle>Delivery:</TextTitle>
                    {
                        includeDeliveryPrice ? <PriceDisplayer price={deliveryPrice} operator={"+"} style={priceStyle} /> :
                            <P sx={{ color: "success.main" }} variant='body2'>Free</P>
                    }
                </Li>
                <Li>
                    <TextTitle style={{ color: "red", fontSize: "21px" }}>Total:</TextTitle>
                    <PriceDisplayer price={totalPrice} style={{ ...priceStyle, color: "red", fontSize: "20px" }} />
                </Li>
                <Divider />
                {
                    isFetchingDiscountCobones ? (
                        <Box className="flex-row-center gap1">
                            <Skeleton variant='rounded' height={35} width="100%" />
                            <Skeleton variant='rounded' height={35} width={40} />
                        </Box>
                    )
                        : cobones && (
                            <Li style={{ p: 0, pb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: "1" }}>
                                    <Discount sx={{ color: 'primary.main', mr: 1, my: 0.5, fontSize: "1rem" }} />
                                    <TextField
                                        error={!isValidCobone}
                                        defaultValue={discountCobone}
                                        disabled={!!discount}
                                        helperText={!isValidCobone ? "The Cobone Is Invalid" : ""}
                                        onChange={(event) => {
                                            if (event.target.value?.length == 0) {
                                                setCoboneState(true);
                                                dispatch(removeDiscount());
                                            }
                                        }}
                                        id="discountCoboneField"
                                        label="Discount cobone"
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
                        )
                }
            </List>
        </Paper>
    )
}
