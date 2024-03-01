import { AddCard, Reply, Save } from '@mui/icons-material';
import { Alert, Box, Button, List } from '@mui/material';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { setChoosedPaymentMethod_localy } from '@/state-management/userPaymentMethods_slice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import CreditCard from './CreditCard';


export default function CreditCardsList({ theList, exit }) {

    const dispatch = useDispatch();
    const { message } = useSpeedMessage();
    const { setChoosedPaymentMethod } = usePaymentMethodsActions();
    const [selectedCardNumber, setCardAsSelected] = useState();
    const { choosedMethod } = useSelector(state => state.userPaymentMethods);

    function save() {
        if (choosedMethod?.number !== selectedCardNumber) {
            const theCard = theList.find(card => card.number === selectedCardNumber);

            setChoosedPaymentMethod(theCard)
                .then(() => {
                    dispatch(setChoosedPaymentMethod_localy(theCard));
                    setCardAsSelected(selectedCardNumber);
                    exit();
                })
                .catch(() => message("Setting card as choosed payment method failed!"))
        }
    }

    useEffect(() => {
        if (choosedMethod && choosedMethod !== "Cash") {
            setCardAsSelected(choosedMethod.number);
        }
    }, [choosedMethod])

    return (
        <Box className="flex-column gap1">
            <List className='flex-column full-width gap1'>
                {
                    theList?.length ?
                        theList.map((card) => (
                            <CreditCard
                                key={card.number}
                                card={card}
                                onSelect={(value) => setCardAsSelected(value)}
                                onDelete={() => setCardAsSelected()}
                                selectedCardNumber={selectedCardNumber}
                            />
                        ))
                        :
                        <Alert sx={{ mb: 1 }} severity="warning">You Didn&apos;t Have Cridet Cards</Alert>
                }
            </List>
            <Box className="flex-row-center-end gap1">
                {
                    selectedCardNumber && choosedMethod?.number !== selectedCardNumber &&
                    <Button
                        onClick={save}
                        size='small' startIcon={<Save />}
                        variant='contained'>
                        Save
                    </Button>
                }
                <Button
                    onClick={exit}
                    size='small' startIcon={<Reply />}
                    variant='contained'>
                    Back
                </Button>
            </Box>
        </Box>
    )
}
