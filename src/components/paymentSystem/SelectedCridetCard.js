import { ChangeCircleOutlined, Payment } from '@mui/icons-material';
import {
    Alert,
    Avatar, Button, ListItem, ListItemAvatar,
    ListItemText
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function SelectedCridetCard({ chooses }) {

    const { choosedMethod } = useSelector(state => state.userPaymentMethods);

    useEffect(() => {
        // if (condition) {

        // }
    }, [choosedMethod]);

    if (choosedMethod) {
        return (
            <ListItem sx={{ border: "solid 1px #eee", borderRadius: 1 }} key={choosedMethod.number}>
                <ListItemAvatar sx={{ minWidth: "40px" }}>
                    <Avatar sx={{ width: "30px", height: "30px", mr: 0 }}>
                        <Payment fontSize='16px' />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={choosedMethod.theName} secondary={choosedMethod.number} />
                <Button 
                    onClick={() => chooses("cards_list")} 
                    size='small' variant='outlined'
                    startIcon={<ChangeCircleOutlined 
                    sx={{ fontSize: '23px !important' }} />}>Change Card</Button>
            </ListItem>
        )
    } else {
        <Alert
            sx={{ width: "100%", mb: 1, alignItems: "center" }}
            severity="error">
            Something Was Wrong!!
        </Alert>
    }
}