"use client"
import { useEffect, useState } from 'react';
import { AppBar, Box, Container, IconButton, Typography } from '@mui/material'
import { Reply, Home } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import checkUserState from '@/functions/checkUserState';
import CantAccessMessage from './CantAccessMessage';
import { useSelector } from 'react-redux';


export default function PageLayout({ children, maxWidth, title, thisProtectedPage, redirect }) {

    const { push, back, replace } = useRouter();
    const userState = useSelector(state => state.userData?.state);
    const [render, setRender] = useState(false)
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        setRender(true)
        if (thisProtectedPage) {
            if (userState) setIsAllowed(true)
            else {
                checkUserState().then((res) => {
                    res && setIsAllowed(res)
                    !res && redirect && replace(redirect)
                })
            }
        }
        else setIsAllowed(true)
    }, [])

    if (render) {
        return isAllowed ?
            <>
                <AppBar position="fixed">
                    <Container maxWidth={maxWidth} sx={{ display: "flex", alignItems: "center", gap: 2, height: "57px" }}>
                        <IconButton onClick={back} sx={{ color: "inherit" }}><Reply /></IconButton>
                        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>{title}</Typography>
                        <IconButton onClick={() => push("/")}><Home /></IconButton>
                    </Container>
                </AppBar>
                <Box sx={{ height: "57px", position: "relative", mb: "25px" }} />
                <Container maxWidth={maxWidth} sx={{ minHeight: "calc(100vh - 57px - 25px)" }}>
                    {children}
                </Container>
            </>
            : <CantAccessMessage />
    }
}
