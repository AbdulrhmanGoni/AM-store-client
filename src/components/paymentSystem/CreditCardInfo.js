import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Image from 'next/image';

export default function CreditCardInfo({ onClick, theName, number, children }) {
    return (
        <ListItem disablePadding onClick={onClick} sx={{ flexWrap: "wrap" }}>
            <ListItemAvatar sx={{ display: "flex", minWidth: "40px" }}>
                <Image
                    src='/credit-card.svg'
                    alt='Credit Card icon'
                    width={30}
                    height={30}
                />
            </ListItemAvatar>
            <ListItemText primary={theName} secondary={number} />
            {children}
        </ListItem>
    )
}
