import { addCreditCard_localy } from '@/state-management/userPaymentMethods_slice';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { AddCard, CalendarMonthOutlined, Payment, PinOutlined, Portrait, Reply } from '@mui/icons-material';
import { Button, FormControl, Grid, Input, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function AddCridetCardForm({ chooses }) {

    const styleInput = { width: "100%" };
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();
    const { addCridetCard } = usePaymentMethodsActions();
    const [isAdding, setIsAdding] = useState(false);
    const [nameValidationState, setNameValidationState] = useState(false);
    const [cardNumberValidationState, setCardNumberValidationState] = useState(false);
    const [dateValidationState, setDateValidationState] = useState(false);
    const [cvvValidationState, setCvvValidationState] = useState(false);

    function isValidNumber(param, length) {
        let isNumber = param.split("").every((num) => !isNaN(parseInt(num)))
        if (isNumber && param.toString().length === length) {
            return true
        } else {
            return false
        }
    }

    function isExpiredDate(inputDate) {
        const now = new Date();
        const date = new Date(inputDate);
        if (date > now) {
            return false;
        } else {
            return true;
        }
    }

    function handleCardName() {
        let value = document.getElementById("cridet-cart-name").value;
        if (value.length > 5) {
            setNameValidationState(false);
            return value;
        } else {
            setNameValidationState(true);
            return false;
        }
    }

    function handleCardNumber() {
        let value = document.getElementById("cridet-cart-number").value;
        if (isValidNumber(value, 12)) {
            setCardNumberValidationState(false);
            return value;
        } else {
            setCardNumberValidationState(true);
            return false;
        }
    }

    function handleCartExpirationDate() {
        let value = document.getElementById("cridet-cart-expiration-date").value;
        if (isExpiredDate(value)) {
            setDateValidationState(true);
            return false;
        } else {
            setDateValidationState(false);
            return value;
        }
    }

    function handleCvv() {
        let value = document.getElementById("cridet-cart-cvv").value;
        if (isValidNumber(value, 3)) {
            setCvvValidationState(false);
            return value;
        } else {
            setCvvValidationState(true);
            return false;
        }
    }

    function addtheCard() {
        let
            theName = handleCardName(),
            cardNumber = handleCardNumber(),
            endDate = handleCartExpirationDate(),
            cvv = handleCvv();

        if (theName && cardNumber && endDate && cvv) {
            const theCard = { theName, number: cardNumber, expired: endDate }
            setIsAdding(true);
            addCridetCard(theCard)
                .then(() => dispatch(addCreditCard_localy(theCard)))
                .catch(() => message("Adding card failed for unknown reason"))
                .finally(() => setIsAdding(false))

        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl sx={styleInput} variant="standard">
                    <InputLabel error={nameValidationState} htmlFor="standard-adornment-amount">The Name</InputLabel>
                    <Input error={nameValidationState}
                        id="cridet-cart-name" placeholder="The Name"
                        startAdornment={<Portrait sx={{ color: nameValidationState ? "red" : "primary.main", mr: "6px" }} position="start">$</Portrait>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={styleInput} variant="standard">
                    <InputLabel error={cardNumberValidationState} htmlFor="standard-adornment-amount">Card Number</InputLabel>
                    <Input error={cardNumberValidationState}
                        id="cridet-cart-number" placeholder="**** **** ****"
                        startAdornment={<Payment sx={{ color: cardNumberValidationState ? "red" : "primary.main", mr: "6px" }} position="start">$</Payment>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={styleInput} variant="standard">
                    <InputLabel error={dateValidationState} htmlFor="standard-adornment-amount">Expiration Date</InputLabel>
                    <Input error={dateValidationState}
                        id="cridet-cart-expiration-date" type='date'
                        startAdornment={<CalendarMonthOutlined sx={{ color: dateValidationState ? "red" : "primary.main", mr: "6px" }} position="start">$</CalendarMonthOutlined>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={styleInput} variant="standard">
                    <InputLabel error={cvvValidationState} htmlFor="standard-adornment-amount">Card Number</InputLabel>
                    <Input error={cvvValidationState}
                        id="cridet-cart-cvv" placeholder="CVV"
                        startAdornment={
                            <PinOutlined sx={{ color: cvvValidationState ? "red" : "primary.main", mr: "6px", fontSize: "25px" }} position="start" />
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                    onClick={addtheCard}
                    sx={{ mr: 2 }}
                    size='small'
                    startIcon={<AddCard />}
                    variant='contained'
                    loading={isAdding}
                >
                    Add
                </LoadingButton>
                <Button
                    onClick={() => chooses("cards_list")}
                    sx={{ mr: 2 }}
                    size='small'
                    startIcon={<Reply />}
                    variant='contained'
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}