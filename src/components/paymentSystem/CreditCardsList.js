import { AddCard, Reply } from '@mui/icons-material';
import { Alert, Box, Button, List } from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { setChoosedPaymentMethod_localy } from '@/state-management/userPaymentMethods_slice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import CreditCard from './CreditCard';


export default function CreditCardsList({ theList, chooses }) {

    const dispatch = useDispatch();
    const { message } = useSpeedMessage();
    const { setChoosedPaymentMethod } = usePaymentMethodsActions();
    const [selectedCardNumber, setCardAsSelected] = useState(null);
    const { choosedMethod } = useSelector(state => state.userPaymentMethods);

    function onSelect(value) {
        if (choosedMethod?.number !== value) {
            const theCard = theList.find(pm => pm.number === value);

            setChoosedPaymentMethod(theCard)
                .then(() => {
                    dispatch(setChoosedPaymentMethod_localy(theCard));
                    setCardAsSelected(value);
                })
                .catch(() => message("Setting card as choosed payment method failed!"))
        }
    }

    useEffect(() => {
        if (choosedMethod && typeof (choosedMethod) !== "string") {
            setCardAsSelected(choosedMethod.number);
        }
    }, [choosedMethod])


    return (
        <>
            <List className='flex-column full-width' sx={{ p: 1 }}>
                {
                    theList?.length ?
                        theList.map((card) => (
                            <CreditCard
                                key={card.number}
                                card={card}
                                onSelect={onSelect}
                                selectedCardNumber={selectedCardNumber}
                            />
                        ))
                        :
                        <Alert sx={{ mb: 1 }} severity="warning">You Dont Have Cridet Cards</Alert>
                }
            </List>
            <Box className="flex-row-center gap1">
                <Button
                    sx={{ flexGrow: 1 }}
                    onClick={() => chooses("add_card")}
                    size='small' startIcon={<AddCard />}
                    variant='contained'>
                    Add New Card
                </Button>
                <Button
                    onClick={() => chooses("selected")}
                    size='small' startIcon={<Reply />}
                    disabled={!choosedMethod}
                    variant='contained'>
                    Back
                </Button>
            </Box>
        </>
    )
}
