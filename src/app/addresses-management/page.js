"use client"
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import SelectedLocationCard from '@/components/locationRegistring/SelectedLocationCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '@/dataBase/actions/locations_slice_actions';
import LocationsManegement from '@/components/locationRegistring/LocationsManegement';
import { ElementWithLoadingState } from '@abdulrhmangoni/am-store-library';

export default function AddressManagement() {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.userData?._id);
    const { locationsList } = useSelector(state => state.locations);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!locationsList) {
            setIsLoading(true)
            dispatch(fetchLocations(userId))
            setIsLoading(false)
        }
    }, [dispatch, locationsList, userId]);
    
    return ((isLoading || locationsList) &&
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ElementWithLoadingState
                isLoading={isLoading}
                height={200}
                element={
                    <Box sx={{ p: 1, border: "solid #eee 1px" }}>
                        <Typography sx={{ p: "8px 16px", mb: 1, border: "solid #eee 1px" }} variant='h6'>Selected Location</Typography>
                        <SelectedLocationCard style={{ border: "dashed 2px", borderColor: "primary.main", p: 1 }} />
                    </Box>
                }
            />
            <ElementWithLoadingState
                isLoading={isLoading}
                height={500}
                element={
                    <LocationsManegement userId={userId} />
                }
            />
        </Box>
    );
}