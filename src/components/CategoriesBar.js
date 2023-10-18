
"use client"
import { useEffect, useState } from 'react';
import { catagoriesInfo } from '@/dataBase/Categories/CATEGORIES';
import { Container, Tabs, Tab, Paper, useMediaQuery } from '@mui/material';
import useProductsSearchParams from '@/hooks/useProductsSearchParams';


export default function CategoriesBar() {

    const media = useMediaQuery("(min-width: 400px)");
    const { getParam, setParam, removeParam } = useProductsSearchParams();
    const [currentTap, setTap] = useState(0);

    useEffect(() => {
        let category = getParam("category");
        if (!category) setTap(0)
        else setTap(catagoriesInfo.find((cat) => cat.name === category).index)
    }, []);

    return (
        <Container sx={{ display: "flex", justifyContent: "center", m: "15px auto" }}>
            <Paper sx={{ maxWidth: { xs: media ? 365 : "100%", sm: 540, lg: 700 } }}>
                <Tabs
                    value={currentTap}
                    onChange={(_, newValue) => setTap(newValue)}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab onClick={() => removeParam("category")} label="All" key="All" />
                    {
                        catagoriesInfo.map((cat) => (
                            <Tab onClick={() => setParam("category", cat.name)} label={cat.name} key={cat.name} />
                        ))
                    }
                </Tabs>
            </Paper>
        </Container>
    );
}