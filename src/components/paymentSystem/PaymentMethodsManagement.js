import React, { useState, useEffect } from 'react'
import { Box, Card, Divider, FormControlLabel, Radio, Alert, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CridetCardsList from './CreditCardsList';
import CridetCardForm from './AddCreditCardForm';
import SelectedCridetCard from './SelectedCridetCard';
import { setUserPaymentMethods } from '@/state-management/userPaymentMethods_slice';
import { setCheckoutPaymentMethod } from '@/state-management/checkoutSummary_slice';
import { ElementWithLoadingState, FetchFailedAlert, P } from '@abdulrhmangoni/am-store-library';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { AddCard, List } from '@mui/icons-material';


export default function PaymentMethodsManagement() {

    const dispatch = useDispatch();
    const { fetchPaymentMethods } = usePaymentMethodsActions();
    const { cardsList, choosedMethod } = useSelector(state => state.userPaymentMethods);
    const checkoutPaymentMethod = useSelector(state => state.checkoutSummary.paymentMethod);
    const userId = useSelector(state => state.userData?._id);
    const [paymentMethodType, setPaymentMethodType] = useState(null);
    const [toRender, setRender] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchError, setFetchError] = useState(false);
    const [refreshFetchingPaymentMethods, setRefreshFetchingPaymentMethods] = useState(false);

    function handlePaymentMethod(event) {
        setPaymentMethodType(event.target.value);
        event.target.value === "Cash" && dispatch(setCheckoutPaymentMethod("Cash"));
        event.target.value === "Card" && dispatch(setCheckoutPaymentMethod(choosedMethod));
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
        if (checkoutPaymentMethod === "Cash") {
            setPaymentMethodType("Cash");
        }
        if (typeof checkoutPaymentMethod?.number === "number") {
            setPaymentMethodType("Card");
        }
    }, [checkoutPaymentMethod, cardsList]);

    return (
        <Card component="form" className='flex-column' sx={{ p: { xs: 1, sm: 2 }, borderRadius: 2 }}>
            <Box sx={{ borderRadius: 2 }}>
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
                        <Alert
                            severity="info"
                            sx={{ mt: 1.5 }}
                        >
                            The Delivery Representative Will Delever The Order To The Location You Added
                        </Alert>
                        : null
                }
            </Box>
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Box sx={{ borderRadius: 2 }}>
                <Box className="flex-column">
                    {
                        isFetchError ? (
                            <FetchFailedAlert
                                message='Failed to fetch your payment methods'
                                refetch={() => setRefreshFetchingPaymentMethods(s => ++s)}
                            />
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
                                    element={
                                        <>
                                            {
                                                paymentMethodType === "Card" &&
                                                <>
                                                    <Divider sx={{ mb: 1, mt: 1 }} />
                                                    <P
                                                        variant='subtitle1'
                                                        fontWeight="bold"
                                                        sx={{ mb: 1, fontSize: "19px" }}
                                                    >
                                                        Choosed Card
                                                    </P>
                                                    <SelectedCridetCard />
                                                </>
                                            }
                                            {
                                                paymentMethodType === "Card" && !toRender &&
                                                <Box className="flex-row j-end" sx={{ flexWrap: "wrap", mt: 1 }}>
                                                    <Button
                                                        {...optionsButtonsProps({
                                                            onClick: () => setRender("add_card"),
                                                            icon: <AddCard />
                                                        })}
                                                    >
                                                        Add card
                                                    </Button>
                                                    <Button
                                                        {...optionsButtonsProps({
                                                            onClick: () => setRender("cards_list"),
                                                            icon: <List />
                                                        })}
                                                    >
                                                        cards list
                                                    </Button>
                                                </Box>
                                            }
                                            {
                                                toRender === "add_card" ?
                                                    <CridetCardForm exit={() => setRender(null)} />
                                                    : toRender === "cards_list" ?
                                                        <CridetCardsList
                                                            exit={() => setRender(null)}
                                                            theList={cardsList}
                                                        />
                                                        : null
                                            }
                                        </>
                                    }
                                />
                            </>
                    }
                </Box>
            </Box>
        </Card>
    )
}

function optionsButtonsProps({ onClick, icon }) {
    return {
        onClick,
        size: 'small',
        sx: {
            fontSize: { xs: "11px", sm: "14px" },
            p: { xs: "2px 5px", sm: "3px 9px" },
            width: "fit-content",
            color: "text.primary"
        },
        startIcon: icon
    }
}