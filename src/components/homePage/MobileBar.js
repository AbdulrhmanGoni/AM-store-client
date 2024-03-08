"use client"
import { IconButton, Paper, useMediaQuery } from '@mui/material';
import mobileBarLinks from "./MobileBarLinks";
import { useRouter } from 'next/navigation';
import { P } from '@abdulrhmangoni/am-store-library';

export default function MobileBar() {

    const isMobileScreen = useMediaQuery("(max-width: 599px)");
    const { push } = useRouter();

    return (
        isMobileScreen && (
            <>
                <Paper
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        justifyContent: "space-around",
                        width: "100%",
                        position: "fixed",
                        zIndex: 500,
                        bottom: 0, left: 0,
                        borderRadius: 0
                    }}
                >
                    {
                        mobileBarLinks.map((link) => {
                            return (
                                <div className='flex-column-center p1' key={link.name}>
                                    {
                                        link.withoutParent ? link.icon
                                            : (
                                                <IconButton
                                                    key={link.name}
                                                    onClick={() => link.path && push(link.path)}
                                                    className='flex-column-center p1'
                                                >
                                                    {link.icon}
                                                </IconButton>
                                            )
                                    }
                                    <P fontSize=".7rem">{link.name}</P>
                                </div>
                            )
                        })
                    }
                </Paper>
                <div style={{ height: "76px", width: "100%" }}></div>
            </>
        )
    );
}
