"use client"
import { IconButton, Paper } from '@mui/material';
import mobileBarLinks from "./MobileBarLinks";
import { useRouter } from 'next/navigation';
import { P } from '@abdulrhmangoni/am-store-library';


export default function MobileBar() {

    const { push } = useRouter()

    return (
        <Paper
            sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-around",
                width: "100%",
                position: "fixed",
                zIndex: 500,
                bottom: 0, left: 0
            }}
        >
            {
                mobileBarLinks.map(
                    (link) => <IconButton
                        key={link.name}
                        onClick={() => link.path && push(link.path)}
                        className='flex-column-center'
                        sx={{ p: 1, flex: 1 }}
                    >
                        {link.icon}
                        <P fontSize=".7rem">{link.name}</P>
                    </IconButton>
                )
            }
        </Paper>
    );
}

