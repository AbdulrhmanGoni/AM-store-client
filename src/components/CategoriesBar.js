import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { catagoriesInfo } from '../dataBase/Categories/CATEGORIES';
import {
    Container, Tabs, Tab, Box
} from '@mui/material';


export default function CategoriesBar() {

    let { category } = useParams();

    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (category === undefined) {
            setValue(0);
        } else {
            setValue(catagoriesInfo.find((cat) => cat.name === category).index);
        }
    }, [category]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ display: "flex", justifyContent: "center", m: "15px auto" }}>
            <Box sx={{ maxWidth: { xs: 340, sm: 540 } }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab onClick={() => navigate("/")} label="All" key="All" />
                    {catagoriesInfo.map(
                        (cat) => <Tab
                            onClick={() => navigate(`categories/${cat.name}`)}
                            label={cat.name}
                            key={cat.name} />
                    )}
                </Tabs>
            </Box>
        </Container>
    );
}