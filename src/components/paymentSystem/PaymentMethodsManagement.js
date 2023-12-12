import React, { useState, useEffect } from 'react'
import { Box, Card, Divider, FormControlLabel, Radio, Alert, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CridetCardsList from './CreditCardsList';
import CridetCardForm from './AddCreditCardForm';
import SelectedCridetCard from './SelectedCridetCard';
import { setChoosedPaymentMethod_localy, setUserPaymentMethods } from '@/dataBase/userPaymentMethods_slice';
import { ElementWithLoadingState } from '@abdulrhmangoni/am-store-library';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { Refresh } from '@mui/icons-material';


export default function PaymentMethodsManagement() {

    const dispatch = useDispatch();
    const { fetchPaymentMethods } = usePaymentMethodsActions();
    const { cardsList, choosedMethod } = useSelector(state => state.userPaymentMethods);
    const userId = useSelector(state => state.userData?._id);
    const [paymentMethodType, setPaymentMethodType] = useState(null);
    const [toRender, setRender] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchError, setFetchError] = useState(false);
    const [refreshFetchingPaymentMethods, setRefreshFetchingPaymentMethods] = useState(false);

    function handlePaymentMethod(event) {
        setPaymentMethodType(event.target.value);
        if (event.target.value === "Cash") {
            dispatch(setChoosedPaymentMethod_localy("Cash"));
        } else {
            dispatch(setChoosedPaymentMethod_localy(null));
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPaymentMethods()
            .then((userPaymentMethods) => {
                dispatch(setUserPaymentMethods(userPaymentMethods));
                isFetchError && setFetchError(false)
            })
            .catch(() => !isFetchError && setFetchError(true))
            .finally(() => setIsLoading(false))
    }, [userId, refreshFetchingPaymentMethods]);

    useEffect(() => {
        if (choosedMethod && typeof (choosedMethod) !== "string") {
            setPaymentMethodType("Card");
            setRender("selected");
        }
        else if (cardsList) setRender("cards_list");
        else setRender("add_card");
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
        <Card component="form" className='flex-column' sx={{ p: 1, borderRadius: 2 }}>
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
                <Box className="flex-column gap1">
                    {
                        isFetchError ? (
                            <Alert
                                severity="error"
                                action={
                                    <IconButton onClick={() => setRefreshFetchingPaymentMethods(s => ++s)}>
                                        <Refresh />
                                    </IconButton>
                                }
                            >
                                Failed to fetch your payment methods
                            </Alert>
                        )
                            :
                            <>
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
                            </>
                    }
                </Box>
            </Box>
        </Card>
    )
}
