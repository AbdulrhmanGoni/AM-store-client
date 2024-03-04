import { Delete } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Radio } from '@mui/material';
import { ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { deleteCreditCard_localy } from '@/state-management/userPaymentMethods_slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreditCardInfo from './CreditCardInfo';


export default function CreditCard({ onSelect, card: { number, theName }, onDelete, isSelectedCard }) {

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { deleteCreditCard } = usePaymentMethodsActions();
    const [deleteLoading, setDeleteLoading] = useState(false);

    async function handleDeleteCard() {
        setDeleteLoading(true);
        deleteCreditCard(number)
            .then(() => {
                dispatch(deleteCreditCard_localy(number));
                onDelete?.()
            })
            .catch(() => message("Deleting card failed for unknown error!"))
            .finally(() => setDeleteLoading(false))
    }

    return (
        <Box
            className='flex-row-center'
            sx={{
                px: { xs: 1, sm: 1.5 },
                bgcolor: "background.default",
                borderRadius: 1
            }}
        >
            <CreditCardInfo
                onClick={() => onSelect(number)}
                theName={theName}
                number={number}
            >
                <Radio
                    checked={isSelectedCard}
                    value={number}
                    inputProps={{ 'aria-label': `${theName}'s Card` }}
                />
            </CreditCardInfo>
            {
                deleteLoading ? <CircularProgress size={20} /> :
                    <ActionAlert
                        title="Delete Cridet Card"
                        message="Are you sure you want to delete this cridet card?"
                        action={handleDeleteCard}
                    >
                        <IconButton size='small' >
                            <Delete color='error' sx={{ fontSize: 18 }} />
                        </IconButton>
                    </ActionAlert>
            }
        </Box>
    )
}
