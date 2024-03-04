import { addCreditCard_localy } from '@/state-management/userPaymentMethods_slice';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { AddCard, CalendarMonthOutlined, Payment, PinOutlined, Portrait, Reply } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { setCheckoutPaymentMethod } from '@/state-management/checkoutSummary_slice';
import useCreditCardFormValidation from '@/hooks/useCreditCardFormValidation';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import FormInput from './FormInput';

export default function AddCridetCardForm({ exit }) {

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { addCridetCard } = usePaymentMethodsActions();

    const {
        isLoading,
        setIsLoading,
        nameValidationState,
        cardNumberValidationState,
        dateValidationState,
        cvvValidationState,
        handleCardName,
        handleCardNumber,
        handleCartExpirationDate,
        handleCvvNumber,
    } = useCreditCardFormValidation()

    function addtheCard() {
        let
            theName = handleCardName(),
            cardNumber = handleCardNumber(),
            endDate = handleCartExpirationDate(),
            cvv = handleCvvNumber();

        if (theName && cardNumber && endDate && cvv) {
            const theCard = { theName, number: cardNumber, expired: endDate }
            setIsLoading(true);
            addCridetCard(theCard)
                .then(() => {
                    dispatch(addCreditCard_localy(theCard));
                    dispatch(setCheckoutPaymentMethod(theCard));
                    exit()
                })
                .catch(() => message("Adding card failed for unknown reason"))
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <>
            <P variant='subtitle1' fontWeight="bold" sx={{ my: 1, fontSize: "19px" }}>Add a Cridet Card</P>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormInput
                        id="cridet-cart-name"
                        label="The Name"
                        state={nameValidationState}
                        Icon={Portrait}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInput
                        id="cridet-cart-number"
                        label="Card Number"
                        placeholder="**** **** ****"
                        state={cardNumberValidationState}
                        Icon={Payment}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormInput
                        id="cridet-cart-expiration-date"
                        label="Expiration Date"
                        state={dateValidationState}
                        Icon={CalendarMonthOutlined}
                        type='date'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormInput
                        id="cridet-cart-cvv"
                        label="Card Number"
                        state={cvvValidationState}
                        Icon={PinOutlined}
                        placeholder="CVV"
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        onClick={addtheCard}
                        sx={{ mr: 2 }}
                        size='small'
                        startIcon={<AddCard />}
                        variant='contained'
                        loading={isLoading}
                    >
                        Add
                    </LoadingButton>
                    <Button
                        onClick={exit}
                        sx={{ mr: 2 }}
                        size='small'
                        startIcon={<Reply />}
                        variant='contained'
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}