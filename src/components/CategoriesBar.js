
"use client"
import { useEffect, useState } from 'react';
import { catagoriesInfo } from '@/CONSTANT/CATEGORIES';
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
        <Container className='flex-row-center' sx={{ m: "15px auto", pl: 0, pr: 0, display: "flex" }}>
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