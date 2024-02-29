import { ChangeCircleOutlined } from '@mui/icons-material';
import {
    Alert, ListItemText,
    Avatar, Button, ListItem, ListItemAvatar
} from '@mui/material';
import { useSelector } from 'react-redux';
import Image from 'next/image';


export default function SelectedCridetCard({ chooses }) {

    const { choosedMethod } = useSelector(state => state.userPaymentMethods);

    if (choosedMethod) {
        return (
            <ListItem sx={{ border: "solid 1px #eee", borderRadius: 1, flexWrap: "wrap" }} key={choosedMethod.number}>
                <ListItemAvatar sx={{ minWidth: "40px" }}>
                    <Image
                        src='/credit-card.svg'
                        alt='Credit Card icon'
                        width={30}
                        height={30}
                    />
                </ListItemAvatar>
                <ListItemText primary={choosedMethod.theName} secondary={choosedMethod.number} />
                <Button
                    onClick={() => chooses("cards_list")}
                    size='small' variant='outlined'
                    sx={{
                        fontSize: { xs: "10px", sm: "14px" },
                        p: { xs: "2px 5px", sm: "3px 9px" }
                    }}
                    startIcon={<ChangeCircleOutlined sx={{ fontSize: '23px !important' }} />}
                >
                    Change
                </Button>
            </ListItem>
        )
    } else {
        <Alert
            sx={{ width: "100%", mb: 1, alignItems: "center" }}
            severity="warning">
            No selected card
        </Alert>
    }
}