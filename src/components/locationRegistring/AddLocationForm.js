import {
    AccountCircle, AddLocation, AddRoad, LocalPhone, LocationCity, Public, SmsOutlined
} from '@mui/icons-material';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import useLocationActions from '@/hooks/useLocationActions';
import { addNewLocation_localy } from '@/state-management/locations_slice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import useLocationFormValidation from '@/hooks/useLocationFormValidation';

const boxStyle = { display: 'flex', alignItems: 'flex-end' }
const styleInput = { width: "100%" }
const styleIcon = { color: 'primary.main', mr: 1, my: 0.5 }

export default function AddLocationForm() {

    const dispatch = useDispatch();
    const { addNewLocation } = useLocationActions();
    const { message } = useSpeedMessage();

    const {
        handleStreetField,
        handleCityField,
        handleCountryField,
        handlePhoneNumperField,
        handleNameField,
        nameValidationState,
        numberValidationState,
        countryValidationState,
        cityValidationState,
        streetValidationState
    } = useLocationFormValidation();

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
                moreDetails: more
            }

            addNewLocation(theLocation)
                .then((locationId) => {
                    theLocation.id = locationId
                    dispatch(addNewLocation_localy(theLocation))
                })
                .catch(() => message("Adding a new location failed"))

        }
    }

    function iconsProps(condition) {
        return {
            ...styleIcon,
            color: condition ? "red" : "primary.main"
        }
    }

    return (
        <Card sx={{ p: "16px 8px", m: 0, width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <AccountCircle sx={iconsProps(nameValidationState.error)} />
                        <TextField
                            error={nameValidationState.error}
                            sx={styleInput}
                            id="theNameField"
                            label="The Name"
                            variant="standard"
                            helperText={nameValidationState.error && nameValidationState.message}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <LocalPhone sx={iconsProps(numberValidationState.error)} />
                        <TextField
                            error={numberValidationState.error}
                            sx={styleInput}
                            id="phoneNumperField"
                            label="Phone Numper"
                            variant="standard"
                            helperText={numberValidationState.error && numberValidationState.message}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <Public sx={iconsProps(countryValidationState.error)} />
                        <TextField
                            error={countryValidationState.error}
                            sx={styleInput}
                            id="countryField"
                            label="Country"
                            variant="standard"
                            helperText={countryValidationState.error && countryValidationState.message}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <LocationCity sx={iconsProps(cityValidationState.error)} />
                        <TextField
                            error={cityValidationState.error}
                            sx={styleInput}
                            id="cityField"
                            label="City"
                            variant="standard"
                            helperText={cityValidationState.error && cityValidationState.message}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <AddRoad sx={iconsProps(streetValidationState.error)} />
                        <TextField
                            error={streetValidationState.error}
                            sx={styleInput}
                            id="streetField"
                            label="Street Address"
                            variant="standard"
                            helperText={streetValidationState.error && streetValidationState.message}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={boxStyle}>
                        <SmsOutlined sx={styleIcon} />
                        <TextField
                            sx={styleInput}
                            id="moreDetailsField"
                            label="More Details"
                            variant="standard"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                        onClick={addLocation}
                        sx={{ mr: 2 }}
                        size='small'
                        startIcon={<AddLocation />}
                        variant='contained'>
                        Add Address
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}