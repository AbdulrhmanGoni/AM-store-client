"use client"
import { useEffect, useState } from 'react';
import { AppBar, Box, Container, IconButton } from '@mui/material';
import { Reply } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CantAccessMessage from './CantAccessMessage';
import { useSelector } from 'react-redux';
import pagesSpaces from '@/CONSTANT/pagesSpaces';
import AccountMenu from './AccountMenu';
import { P } from "@abdulrhmangoni/am-store-library";


export default function PageLayout({ children, maxWidth, title, signUpRequired, redirect }) {

    const { back, replace } = useRouter();
    const userId = useSelector(state => state.userData?._id);
    const [render, setRender] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        setRender(true);
        if (signUpRequired) {
            if (userId) setIsAllowed(true);
            else {
                isAllowed && setIsAllowed(false);
                redirect && replace(redirect);
            }
        }
        else setIsAllowed(true);
    }, [userId])

    if (render) {
        return isAllowed ?
            <>
                <AppBar position="fixed">
                    <Container maxWidth={maxWidth} sx={{ display: "flex", alignItems: "center", gap: 2, height: "57px" }}>
                        <IconButton onClick={back} sx={{ color: "inherit" }}><Reply /></IconButton>
                        <P
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                flexGrow: 1,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                textWrap: "nowrap"
                            }}
                        >
                            {title}
                        </P>
                        <AccountMenu />
                    </Container>
                </AppBar>
                <Box sx={{ height: "57px", position: "relative", mb: "25px" }} />
                <Container
                    maxWidth={maxWidth}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "calc(100vh - 57px - 25px)",
                        px: pagesSpaces
                    }}
                >
                    {children}
                </Container>
            </>
            : <CantAccessMessage />
    }
}
