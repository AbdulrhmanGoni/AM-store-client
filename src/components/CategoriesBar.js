"use client"
import { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Paper, useMediaQuery } from '@mui/material';
import useProductsSearchParams from '@/hooks/useProductsSearchParams';
import { useSelector } from 'react-redux';


export default function CategoriesBar() {

    const media = useMediaQuery("(min-width: 400px)");
    const { getParam, setParam, removeParam } = useProductsSearchParams();
    const [currentTap, setTap] = useState(0);
    const productsCategories = useSelector(state => state.variables.productsCategories);

    useEffect(() => {
        let category = getParam("category");
        if (category) setTap(productsCategories.indexOf(category) + 1)
        else setTap(0)
    }, []);

    return (
        <Container sx={{ display: "flex", justifyContent: "center", m: "15px auto", px: 0 }}>
            <Paper sx={{ maxWidth: { xs: media ? 365 : "100%", sm: 540, lg: 700 } }}>
                <Tabs
                    value={currentTap}
                    onChange={(_, newValue) => setTap(newValue)}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab onClick={() => removeParam("category")} label="All" />
                    {
                        productsCategories.map((category) => (
                            <Tab
                                key={category}
                                label={category}
                                onClick={() => { setParam("category", category) }}
                            />
                        ))
                    }
                </Tabs>
            </Paper>
        </Container>
    );
}