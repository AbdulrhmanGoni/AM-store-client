import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { catagoriesInfo } from '../dataBase/Categories/CATEGORIES';
import { Container, Tabs, Tab, Paper } from '@mui/material';


export default function CategoriesBar() {

    let { category } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (category === undefined) { setValue(0) }
        else { setValue(catagoriesInfo.find((cat) => cat.name === category).index) }
    }, [category]);

    const handleChange = (_, newValue) => { setValue(newValue) }

    return (
        <Container sx={{ display: "flex", justifyContent: "center", m: "15px auto" }}>
            <Paper sx={{ maxWidth: { xs: 340, sm: 540 } }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab onClick={() => navigate("/")} label="All" key="All" />
                    {catagoriesInfo.map(
                        (cat) => <Tab
                            onClick={() => navigate(`categories/${cat.name}`)}
                            label={cat.name}
                            key={cat.name} />
                    )}
                </Tabs>
            </Paper>
        </Container>
    );
}