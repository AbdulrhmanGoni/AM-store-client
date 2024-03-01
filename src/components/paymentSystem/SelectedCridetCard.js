import { Alert, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CreditCardInfo from './CreditCardInfo';

export default function SelectedCridetCard() {

    const { choosedMethod } = useSelector(state => state.userPaymentMethods);

    if (choosedMethod) {
        return (
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
        )
    } else {
        return (
            <Alert
                sx={{ width: "100%", mb: 1, alignItems: "center" }}
                severity="warning">
                No selected card
            </Alert>
        )
    }
}