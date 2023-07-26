import React from 'react'
import { Outlet } from 'react-router-dom'
import CategoriesBar from "../components/CategoriesBar"
import { Container, useMediaQuery } from "@mui/material";
import NavBar from '../components/NavBar';
import MobileBar from '../components/MobileBar';

export default function HomePage() {

    const mobileDevice = useMediaQuery("(max-width: 599px)");

    return (
        <>
            <NavBar />
            <CategoriesBar />
            <Container maxWidth="lg" sx={{ height: "100%", mb: "57px" }}>
                <Outlet />
            </Container>
            {mobileDevice ? <MobileBar /> : null}
        </>
    )
}
