"use client"
import { useState, useEffect } from 'react';
import { Box, Button, Divider, IconButton, Typography, useMediaQuery, Alert, Card, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LocationsList from './LocationsList';
import AddLocationForm from './AddLocationForm';
import GoogleMaps from './GoogleMaps';
import { AddLocation, Close, Map } from '@mui/icons-material';
import { setSelectedLocation } from '@/dataBase/actions/locations_slice_actions';


export default function LocationsManegement({ defualtDisplay, control, float, userId }) {

    const maxWidth = useMediaQuery("(max-width: 600px)");
    const dispatch = useDispatch();
    const { selectedLocation, locationsList } = useSelector(state => state.locations)
    const [theSelected, setTheSelected] = useState(null);
    const { palette: { mode } } = useTheme(null);
    const [isChanged, setChange] = useState(false);
    const [toRender, setRender] = useState(null);

    function handleRender() {
        if (["locations_list", "add_location", "map"].includes(defualtDisplay)) {
            setRender(defualtDisplay);
        }
        else {
            if (locationsList?.length) {
                setRender("locations_list");
            } else {
                setRender("add_location");
            }
        }
    }

    useEffect(() => { handleRender() }, [locationsList]);

    useEffect(() => {
        if (selectedLocation) {
            setTheSelected(selectedLocation.id);
        }
    }, [selectedLocation]);

    useEffect(() => {
        if (selectedLocation) {
            if (theSelected && selectedLocation.id !== theSelected) setChange(true);
            else setChange(false);
        } else if (theSelected) {
            setChange(true);
        }
        else setChange(false);
    }, [theSelected, selectedLocation]);

    function ToRender() {
        switch (toRender) {
            case "locations_list": return (
                <LocationsList
                    chooses={setRender}
                    theSelected={theSelected}
                    setTheSelected={setTheSelected}
                />
            );
            case "add_location": return <AddLocationForm chooses={setRender} />;
            case "map": return <GoogleMaps />;
            default: return <Alert sx={{ mb: 1 }} severity="warning">Eroor</Alert>;
        }
    }

    function onSave(event) {
        event.preventDefault();
        if (theSelected) {
            const newSelected = locationsList.find((location) => location.id === theSelected);
            dispatch(setSelectedLocation({ userId: userId, theLocation: newSelected }));
        }
        if (float) { control(false) }
    }

    const btnSize = maxWidth ? "small" : null;
    const btnContainer = { display: "flex", gap: 1, flexBasis: { xs: "100%", sm: "initial" } };
    const btnStyle = { width: { xs: "100%", sm: "initial" } };

    return (
        <Card
            component="form"
            onSubmit={onSave}
            elevation={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                border: "solid #eee 1px",
                borderRadius: 1,
                width: float ? { xs: "96vw", sm: "500px", md: "800px" } : { width: "100%" }
            }}>
            <Bar dividerBotton>
                <Typography variant='h6'>Select Delivery Address</Typography>
                {float && <IconButton onClick={() => control(false)}><Close /></IconButton>}
            </Bar>
            <Box sx={{ p: 1, height: "400px", overflow: "auto" }}>
                <ToRender />
            </Box>
            <Bar dividerTop sx={{ gap: { xs: 1, sm: 0 } }}>
                <Box sx={btnContainer}>
                    <Button
                        variant={mode === "light" ? "text" : null}
                        sx={btnStyle}
                        size={`${btnSize}`}
                        startIcon={<AddLocation sx={{ color: 'primary.main' }} />}
                        onClick={() => setRender("add_location")}>New Address</Button>
                    <Button
                        variant={mode === "light" ? "text" : null}
                        sx={btnStyle}
                        size={`${btnSize}`}
                        startIcon={<Map sx={{ color: 'primary.main' }} />}
                        onClick={() => setRender("map")}>Use The Map</Button>
                </Box>
                <Box sx={btnContainer}>
                    {
                        toRender !== "locations_list" ?
                            <Button onClick={() => setRender("locations_list")} sx={btnStyle} size={`${btnSize}`} variant='outlined'>Cancel</Button>
                            : null
                    }
                    {
                        isChanged && toRender === "locations_list" ?
                            <Button type='submit' onClick={onSave} sx={btnStyle} size={`${btnSize}`} variant='contained'>Save</Button>
                            : null
                    }
                </Box>
            </Bar>
        </Card>
    )
}

export const Bar = ({ children, sx, dividerTop, dividerBotton }) => {
    return (
        <>
            {dividerTop && <Divider />}
            <Box sx={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-between",
                alignItems: "center",
                p: "8px 16px", ...sx
            }}>
                {children}
            </Box>
            {dividerBotton && <Divider />}
        </>
    )
}
