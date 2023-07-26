import {
    Alert, Box, FormControl, FormControlLabel, Radio, RadioGroup
} from '@mui/material';

import LocationCard from './LocationCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function LocationsList({ theSelected, setTheSelected, chooses }) {

    const { locationsList } = useSelector(state => state.locations);

    function handleChange(event) {
        setTheSelected(event.target.value);
    }

    useEffect(() => {
        if (!locationsList.length) {
            chooses("add_location")
        }
    }, [locationsList]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: '100%', gap: 1
        }}>
            <FormControl>
                <RadioGroup sx={{ gap: "10px" }} onChange={handleChange}
                    aria-labelledby="Locations List"
                    defaultValue={theSelected}
                    name="LocationsList"
                >
                    {
                        locationsList.map((location, index) => {
                            return (
                                <LocationCard
                                    key={index}
                                    setTheSelected={setTheSelected}
                                    isSelected={theSelected}
                                    id={location.id}
                                    locationData={location}>
                                    <FormControlLabel sx={{ m: 0, "& span": { p: 0 } }} value={location.id} control={<Radio />} />
                                </LocationCard>
                            )
                        })
                    }
                </RadioGroup>
            </FormControl>
        </Box>
    )
}
