import { Delete } from '@mui/icons-material';
import {
    Box, CircularProgress,
    IconButton, ListItem,
    ListItemAvatar,
    ListItemText, Radio
} from '@mui/material';
import Image from 'next/image';
import { ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';
import { deleteCreditCard_localy } from '@/dataBase/userPaymentMethods_slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function CreditCard({ onSelect, card: { number, theName }, selectedCardNumber }) {
    
    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { deleteCreditCard } = usePaymentMethodsActions();
    const [deleteLoading, setDeleteLoading] = useState(false);

    async function handleDeleteCard() {
        setDeleteLoading(true);
        deleteCreditCard(number)
            .then(() => dispatch(deleteCreditCard_localy(number)))
            .catch(() => message("Deleting card failed for unknown error!"))
            .finally(() => setDeleteLoading(false))
    }

    return (
        <Box className='flex-row-center' key={number}>
            <ListItem sx={{ p: 0 }} onClick={() => onSelect(number)}>
                <ListItemAvatar sx={{ display: "flex", minWidth: "40px" }}>
                    <Image
                        src='/credit-card.svg'
                        alt='Credit Card icon'
                        width={30}
                        height={30}
                    />
                </ListItemAvatar>
                <ListItemText primary={theName} secondary={number} />
                <Radio
                    checked={selectedCardNumber === number}
                    value={number}
                    inputProps={{ 'aria-label': `${theName}'s Card` }}
                />
            </ListItem>
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
