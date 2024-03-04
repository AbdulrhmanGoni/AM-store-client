import { Box, Card, Divider, FormControlLabel, Radio, Alert } from '@mui/material';
import CridetCardsList from './CreditCardsList';
import CridetCardForm from './AddCreditCardForm';
import SelectedCridetCard from './SelectedCridetCard';
import { ElementWithLoadingState, FetchFailedAlert, P } from '@abdulrhmangoni/am-store-library';
import usePaymentMethodsManagement from '@/hooks/usePaymentMethodsManagement';
import OptionsBar from './OptionsBar';
import DangerousWaring from './DangerousWaring';


export default function PaymentMethodsManagement() {

    const {
        isLoading,
        isFetchError,
        cardsList,
        paymentMethodType,
        toRender,
        render,
        handleChoosingPaymentMethod,
    } = usePaymentMethodsManagement()

    return (
        <Card
            component="form"
            className='flex-column'
            sx={{ p: { xs: 1, sm: 2 }, borderRadius: 2 }}
        >
            <Box sx={{ borderRadius: 2 }}>
                <FormControlLabel
                    sx={{ fontWeight: "900" }}
                    value="Cash"
                    control={<Radio />}
                    label="Cash On Delivery"
                    labelPlacement="end"
                    checked={paymentMethodType === "Cash"}
                    onClick={handleChoosingPaymentMethod}
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
                                <ElementWithLoadingState height={42} isLoading={isLoading}
                                    element={
                                        <FormControlLabel
                                            value="Card"
                                            control={<Radio />}
                                            label="Cridet Card"
                                            labelPlacement="end"
                                            checked={paymentMethodType === "Card"}
                                            onClick={handleChoosingPaymentMethod}
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
                                                    <DangerousWaring />
                                                    <SelectedCridetCard />
                                                </>
                                            }
                                            {
                                                paymentMethodType === "Card" && !toRender &&
                                                <OptionsBar render={render} />
                                            }
                                            {
                                                paymentMethodType === "Card" && (
                                                    toRender === "add_card" ?
                                                        <CridetCardForm exit={() => render(null)} />
                                                        : toRender === "cards_list" ?
                                                            <CridetCardsList
                                                                exit={() => render(null)}
                                                                theList={cardsList}
                                                            />
                                                            : null
                                                )
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
