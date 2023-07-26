import { Box, Typography } from '@mui/material';
import LocationManegement from '../components/locationRegistring/LocationManegement';
import { SelectedLocationCard } from '../components/locationRegistring/LocationCard';
import { useDispatch, useSelector } from 'react-redux';
import withGurd from '../components/withGurd';
import { useEffect } from 'react';
import { fetchLocations } from '../dataBase/actions/locations_slice_actions';

const AddressManagement = ({ userId }) => {

    const dispatch = useDispatch();
    const { userData, locations: { locationsList } } = useSelector(state => state);

    useEffect(() => {
        if (userData) {
            dispatch(fetchLocations(userData._id));
        }
    }, [userData]);

    return (
        <>
            {
                locationsList &&
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ p: 1, border: "solid #eee 1px" }}>
                        <Typography sx={{ p: "8px 16px", mb: 1, border: "solid #eee 1px" }} variant='h6'>Selected Location</Typography>
                        <SelectedLocationCard style={{ border: "dashed 2px", borderColor: "primary.main", p: 1 }} />
                    </Box>
                    <LocationManegement userId={userId} />
                </Box>
            }
        </>
    );
}

export default withGurd(AddressManagement);