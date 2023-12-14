"use client"
import { useEffect, useState } from 'react';
import { AppBar, Box, Container, IconButton } from '@mui/material';
import { Reply } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import checkUserState from '@/functions/checkUserState';
import CantAccessMessage from './CantAccessMessage';
import { useSelector } from 'react-redux';
import pagesSpaces from '@/CONSTANT/pagesSpaces';
import AccountMenu from './AccountMenu';
import { P } from "@abdulrhmangoni/am-store-library";


export default function PageLayout({ children, maxWidth, title, signUpRequired, redirect }) {

    const { back, replace } = useRouter();
    const userData = useSelector(state => state.userData);
    const [render, setRender] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        setRender(true);
        if (signUpRequired) {
            if (userData) setIsAllowed(true);
            else {
                checkUserState().then((res) => {
                    res && setIsAllowed(res);
                    !res && redirect && replace(redirect);
                })
            }
        }
        else setIsAllowed(true);
    }, [])

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
                        minHeight: "100vh",
                        px: pagesSpaces
                    }}
                >
                    {children}
                </Container>
            </>
            : <CantAccessMessage />
    }
}
