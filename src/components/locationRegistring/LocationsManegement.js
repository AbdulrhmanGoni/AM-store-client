"use client"
import { useState, useEffect } from 'react';
import { Box, Button, Divider, IconButton, useMediaQuery, Card, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LocationsList from './LocationsList';
import AddLocationForm from './AddLocationForm';
import GoogleMaps from './GoogleMaps';
import { AddLocation, AddLocationAlt, Close, Map, MyLocation } from '@mui/icons-material';
import useLocationActions from '@/hooks/useLocationActions';
import { setSelectedLocation_localy } from '@/state-management/locations_slice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { LoadingButton } from '@mui/lab';
import { P } from "@abdulrhmangoni/am-store-library";

export default function LocationsManegement({ defualtDisplay, control, float }) {

    const maxWidth = useMediaQuery("(max-width: 600px)");
    const { palette: { mode } } = useTheme(null);
    const dispatch = useDispatch();
    const { setSelectedLocation } = useLocationActions();
    const { message } = useSpeedMessage();
    const { selectedLocation, locationsList } = useSelector(state => state.locations)
    const [theSelected, setTheSelected] = useState(null);
    const [isChanged, setChange] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toRender, setRender] = useState(null);

    useEffect(() => {
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
    }, [defualtDisplay, locationsList]);

    useEffect(() => { selectedLocation && setTheSelected(selectedLocation.id) }, [selectedLocation]);

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
            default: return;
        }
    }

    function onSave(event) {
        event.preventDefault();
        if (theSelected) {
            const newSelected = locationsList.find((location) => location.id === theSelected);
            setIsSaving(true);
            setSelectedLocation(newSelected)
                .then(() => dispatch(setSelectedLocation_localy(newSelected)))
                .catch(() => message("Setting the selected location failed."))
                .finally(() => {
                    setIsSaving(false)
                    float && control(false);
                })
        }
    }

    const btnSize = maxWidth ? "small" : "medium";
    const btnContainer = { display: "flex", gap: 1, flexBasis: { xs: "100%", sm: "initial" } };
    const btnStyle = { width: { xs: "100%", sm: "initial" } };

    return (
        <Card
            component="form"
            onSubmit={onSave}

            className='flex-column'
            sx={{ width: float ? { xs: "96vw", sm: "500px", md: "800px" } : { width: "100%" } }}>
            <Bar sx={{ bgcolor: "background.paper" }} dividerBotton>
                <P className='flex-row-center-start gap1' variant='h6'>
                    {toRender === "locations_list" ? <MyLocation /> : <AddLocationAlt />}
                    {toRender === "locations_list" ? "Select Delivery Address" : "Add a location"}
                </P>
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
                            <Button
                                onClick={() => setRender("locations_list")}
                                sx={btnStyle}
                                size={`${btnSize}`}
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                            : null
                    }
                    {
                        isChanged && toRender === "locations_list" ?
                            <LoadingButton
                                type='submit'
                                onClick={onSave}
                                sx={btnStyle}
                                size={`${btnSize}`}
                                variant='contained'
                                loading={isSaving}
                            >
                                Save
                            </LoadingButton>
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