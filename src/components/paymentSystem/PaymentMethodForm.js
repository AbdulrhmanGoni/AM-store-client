import React, { useState } from 'react'
import { Box, Card, Divider, FormControlLabel, Radio, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CridetCardsList from './CridetCardsList';
import CridetCardForm from './AddCridetCardForm';
import SelectedCridetCard from './SelectedCridetCard';
import { Alert } from '@mui/material';
import { choosePaymentMethod } from '../../dataBase/userPaymentMethods_slice';



export default function PaymentMethodForm() {

    const dispatch = useDispatch();

    const { userPaymentMethods: { cardsList, choosedMethod } } = useSelector(state => state);

    const [paymentMethodType, setPaymentMethodType] = useState(null);

    const [toRender, setRender] = useState(null);

    function handlePaymentMethod(event) {
        setPaymentMethodType(event.target.value);
        if (event.target.value === "Cash") {
            dispatch(choosePaymentMethod("Cash"));
        } else {
            dispatch(choosePaymentMethod(null));
        }
    }

    useEffect(() => {
        if (choosedMethod && typeof (choosedMethod) !== "string") {
            setPaymentMethodType("Card");
            setRender("selected");
        }
        else if (cardsList) {
            setRender("cards_list");
        } else {
            setRender("add_card");
        }
    }, [choosedMethod, cardsList]);


    function ToRender() {
        switch (toRender) {
            case "cards_list":
                return <CridetCardsList chooses={setRender} theList={cardsList} />;

            case "add_card":
                return <CridetCardForm chooses={setRender} />;

            case "selected":
                return <SelectedCridetCard chooses={setRender} />;

            default:
                return <Alert sx={{ mb: 1 }} severity="warning">Something Was Wrong!</Alert>;
        }
    }

    return (
        <Card elevation={1} component="form" sx={{ display: "flex", flexDirection: "column", p: 1, borderRadius: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2 }}>
                <FormControlLabel
                    sx={{ fontWeight: "900" }}
                    value="Cash"
                    control={<Radio />}
                    label="Cash On Delivery"
                    labelPlacement="end"
                    checked={paymentMethodType === "Cash"}
                    onClick={handlePaymentMethod}
                />
                {
                    paymentMethodType === "Cash" ?
                        <>
                            <Divider sx={{ mb: 1 }} />
                            <Alert severity="info">The Delivery Representative Will Delever The Order To The Location You Added </Alert>
                        </>
                        :
                        null
                }
            </Box>
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Box sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <FormControlLabel
                        value="Card"
                        control={<Radio />}
                        label="Cridet Card"
                        labelPlacement="end"
                        checked={paymentMethodType === "Card"}
                        onClick={handlePaymentMethod}
                    />
                    {
                        paymentMethodType === "Card" ?
                            <>
                                <Divider />
                                <ToRender />
                            </>
                            :
                            null
                    }
                </Box>
            </Box>
        </Card>
    )
}
