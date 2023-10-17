import { Alert, Typography } from '@mui/material';

export default function AvailabationState({ amount, visitAllAmount, style }) {

    let howManyLeft = () => {
        if (visitAllAmount) {
            return !amount ? "Out Of Stock" : amount < 4 ? `Only: ${amount} Left` : amount < 10 ? `${amount} Left` : "Available"
        } else {
            return amount ? `Only: ${amount} Left` : "Out Of Stock"
        }
    }

    return (amount < 4 || visitAllAmount ?
        <Alert
            icon={false} color={amount > 3 ? "info" : amount ? "warning" : "error"}
            sx={{ p: "5px 8px", "& div": { p: 0 }, ...style }}>
            <Typography
                sx={{ fontSize: { xs: "0.600rem", sm: "0.800rem" } }}
                variant='subtitle2'>
                {howManyLeft()}
            </Typography>
        </Alert> : null
    )
}