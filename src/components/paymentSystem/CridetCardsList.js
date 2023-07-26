import { AddCard, Delete, Payment, Reply } from '@mui/icons-material';
import {
    Alert, Box, Button,
    CircularProgress,
    IconButton,
    List, ListItem, ListItemAvatar,
    ListItemText, Paper, Radio
} from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCreditCard, setCreditCard } from '../../dataBase/actions/userPaymentMethods_slice_actions';
import { useEffect } from 'react';
import ActionAlert from '../ActionAlert';


export default function CridetCardsList({ theList, chooses }) {

    const dispatch = useDispatch();
    const [selectedCard, setCardAsSelected] = useState(null);
    const { userData, userPaymentMethods: { choosedMethod } } = useSelector(state => state);
    const [deleteLoading, setDeleteLoading] = useState(false);

    function handleChange(value) {
        setCardAsSelected(value);
        dispatch(setCreditCard({
            userId: userData._id,
            theCard: theList.find(pm => pm.number === value),
            type: "choosedMethod"
        }));
    }

    async function handleDeleteCard(cardNumber) {
        setDeleteLoading(true);
        await dispatch(deleteCreditCard({ userId: userData._id, cardNumber }));
        setDeleteLoading(false);
    }

    useEffect(() => {
        if (choosedMethod && typeof (choosedMethod) !== "string") {
            setCardAsSelected(choosedMethod.number);
        }
    }, [choosedMethod])


    return (
        <>
            <Paper elevation={1}>
                <List sx={{ display: "flex", flexDirection: "column", width: '100%', p: 1 }}>
                    {
                        theList.length > 0 ?
                            theList.map((card) => {
                                return (
                                    <Box sx={{ display: "flex", alignItems: "center" }} key={card.number}>
                                        <ListItem sx={{ p: 0 }} onClick={() => handleChange(card.number)}>
                                            <ListItemAvatar sx={{ display: "flex", minWidth: "40px" }}>
                                                <Payment sx={{ color: 'primary.main' }} />
                                            </ListItemAvatar>
                                            <ListItemText primary={card.theName} secondary={card.number} />
                                            <Radio
                                                checked={selectedCard === card.number}
                                                value={card.number}
                                                inputProps={{ 'aria-label': `${card.theName}'s Card` }}
                                            />
                                        </ListItem>
                                        {
                                            deleteLoading ? <CircularProgress size={20} /> :
                                                <ActionAlert
                                                    title="Delete Cridet Card"
                                                    message="Are you sure you want to delete this cridet card"
                                                    action={() => handleDeleteCard(card.number)}
                                                >
                                                    <IconButton size='small' >
                                                        <Delete color='error' sx={{ fontSize: 18 }} />
                                                    </IconButton>
                                                </ActionAlert>
                                        }
                                    </Box>
                                )
                            })
                            :
                            <Alert sx={{ mb: 1 }} severity="warning">You Dont Have Cridet Card</Alert>
                    }
                </List>
            </Paper>
            <Box sx={{ display: "flex", gap: 1 }}>
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
