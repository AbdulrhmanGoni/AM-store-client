import { Alert, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CreditCardInfo from './CreditCardInfo';
import { P } from '@abdulrhmangoni/am-store-library';

export default function SelectedCridetCard() {

    const { choosedMethod } = useSelector(state => state.userPaymentMethods);

    return (
        <>
            <P
                variant='subtitle1'
                fontWeight="bold"
                sx={{ mb: 1, fontSize: "19px" }}
            >
                Choosed Card
            </P>
            {
                choosedMethod ?
                    <Box
                        sx={{
                            px: { xs: 1, sm: 1.5 },
                            bgcolor: "background.paper",
                            borderRadius: 1
                        }}
                    >
                        <CreditCardInfo
                            theName={choosedMethod.theName}
                            number={choosedMethod.number}
                        />
                    </Box>
                    : <Alert
                        sx={{ width: "100%", mb: 1, alignItems: "center" }}
                        severity="warning">
                        No selected card
                    </Alert>
            }
        </>
    )
}