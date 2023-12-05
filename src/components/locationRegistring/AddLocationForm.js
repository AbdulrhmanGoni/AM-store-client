import {
    AccountCircle, AddLocation, AddRoad, LocalPhone, LocationCity, Public, SmsOutlined
} from '@mui/icons-material';

import { Box, Button, Card, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useLocationActions from '@/hooks/useLocationActions';
import { addNewLocation_localy } from '@/dataBase/locations_slice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';


export default function AddLocationForm() {
    const boxStyle = { display: 'flex', alignItems: 'flex-end' }
    const styleInput = { width: "100%" }
    const styleIcon = { color: 'primary.main', mr: 1, my: 0.5 }

    const dispatch = useDispatch();
    const { addNewLocation } = useLocationActions();
    const { message } = useSpeedMessage();

    const [nameValidationState, setNameValidationState] = useState(false);
    const [numberValidationState, setNumberValidationState] = useState(false);
    const [countryValidationState, setCnountryValidationState] = useState(false);
    const [cityValidationState, setCityValidationState] = useState(false);
    const [streetValidationState, setStreetValidationState] = useState(false);

    const validLength = (param, length) => param.length >= length;

    function handleNameField() {
        let value = document.getElementById("theNameField").value;
        if (validLength(value, 3)) {
            setNameValidationState(false);
            return value;
        } else {
            setNameValidationState(true);
            return false;
        }
    }

    function handlePhoneNumperField() {
        let value = document.getElementById("phoneNumperField").value;
        let isNumber = value.split("").every((num) => !isNaN(parseInt(num)));
        isNumber = value.length > 0 ? isNumber : false;

        if (isNumber) {
            setNumberValidationState(false);
            return value;
        } else {
            setNumberValidationState(true);
            return false;
        }
    }

    function handleCountryField() {
        let value = document.getElementById("countryField").value;
        if (validLength(value, 3)) {
            setCnountryValidationState(false);
            return value;
        } else {
            setCnountryValidationState(true);
            return false;
        }
    }

    function handleCityField() {
        let value = document.getElementById("cityField").value;
        if (validLength(value, 3)) {
            setCityValidationState(false);
            return value;
        } else {
            setCityValidationState(true);
            return false;
        }
    }

    function handleStreetField() {
        let value = document.getElementById("streetField").value;
        if (validLength(value, 3)) {
            setStreetValidationState(false);
            return value;
        } else {
            setStreetValidationState(true);
            return false;
        }
    }

    function addLocation() {
        let theName = handleNameField();
        let phoneNumper = handlePhoneNumperField();
        let country = handleCountryField();
        let city = handleCityField();
        let Street = handleStreetField();
        let more = document.getElementById("moreDetailsField").value;

        if (theName && phoneNumper && country && city && Street) {
            const theLocation = {
                theName: theName,
                phone: phoneNumper,
                country: country,
                city: city,
                street: Street,
                moreDetails: more,
                type: "Home"
            }

            addNewLocation(theLocation)
                .then(() => dispatch(addNewLocation_localy(theLocation)))
                .catch(() => message("Adding a new location failed"))

        }
    }

    return (
        <Card sx={{ p: "16px 8px", m: 0, width: "100%" }} elevation={1}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <AccountCircle sx={{ ...styleIcon, color: nameValidationState ? "red" : "primary.main" }} />
                        <TextField error={nameValidationState} sx={styleInput} id="theNameField" label="The Name" variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <LocalPhone sx={{ ...styleIcon, color: numberValidationState ? "red" : "primary.main" }} />
                        <TextField error={numberValidationState} sx={styleInput} id="phoneNumperField" label="Phone Numper" variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <Public sx={{ ...styleIcon, color: countryValidationState ? "red" : "primary.main" }} />
                        <TextField error={countryValidationState} sx={styleInput} id="countryField" label="Country" variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <LocationCity sx={{ ...styleIcon, color: cityValidationState ? "red" : "primary.main" }} />
                        <TextField error={cityValidationState} sx={styleInput} id="cityField" label="City" variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <AddRoad sx={{ ...styleIcon, color: streetValidationState ? "red" : "primary.main" }} />
                        <TextField error={streetValidationState} sx={styleInput} id="streetField" label="Street Address" variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <SmsOutlined sx={styleIcon} />
                        <TextField sx={styleInput} id="moreDetailsField" label="More Details" variant="standard" />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button onClick={addLocation} sx={{ mr: 2 }} size='small' startIcon={<AddLocation />} variant='contained'>Add Address</Button>
                </Grid>
            </Grid>
        </Card>
    )
}