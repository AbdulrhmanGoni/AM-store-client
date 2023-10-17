import React, { useState, useEffect } from 'react'
import { Box, Card, Divider, FormControlLabel, Radio, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CridetCardsList from './CridetCardsList';
import CridetCardForm from './AddCridetCardForm';
import SelectedCridetCard from './SelectedCridetCard';
import { choosePaymentMethod } from '@/dataBase/userPaymentMethods_slice';
import { ElementWithLoadingState } from '@abdulrhmangoni/am-store-library';
import { fetchPaymentMethods } from '@/dataBase/actions/userPaymentMethods_slice_actions';



export default function PaymentMethodForm() {

    const dispatch = useDispatch();
    const { cardsList, choosedMethod } = useSelector(state => state.userPaymentMethods);
    const userId = useSelector(state => state.userData?._id);
    const [paymentMethodType, setPaymentMethodType] = useState(null);
    const [toRender, setRender] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handlePaymentMethod(event) {
        setPaymentMethodType(event.target.value);
        if (event.target.value === "Cash") {
            dispatch(choosePaymentMethod("Cash"));
        } else {
            dispatch(choosePaymentMethod(null));
        }
    }

    async function bringPaymentMethods(userId) {
        setIsLoading(true)
        await dispatch(fetchPaymentMethods(userId))
        setIsLoading(false)
    }

    useEffect(() => { bringPaymentMethods(userId) }, [userId]);

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


    function ToRender({ renderId }) {
        let components = {
            "cards_list": <CridetCardsList chooses={setRender} theList={cardsList} />,
            "add_card": <CridetCardForm chooses={setRender} />,
            "selected": <SelectedCridetCard chooses={setRender} />
        }
        return components[renderId]
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
                    <ElementWithLoadingState height={42}
                        isLoading={isLoading}
                        element={
                            <FormControlLabel
                                value="Card"
                                control={<Radio />}
                                label="Cridet Card"
                                labelPlacement="end"
                                checked={paymentMethodType === "Card"}
                                onClick={handlePaymentMethod}
                            />
                        }
                    />
                    <ElementWithLoadingState height={75} isLoading={isLoading}
                        element={paymentMethodType === "Card" ? <><Divider /><ToRender renderId={toRender} /></> : null}
                    />
                </Box>
            </Box>
        </Card>
    )
}
