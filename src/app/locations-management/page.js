"use client"
import { useEffect, useState } from 'react';
import { Box, Button, Divider } from '@mui/material';
import SelectedLocationCard from '@/components/locationRegistring/SelectedLocationCard';
import { useDispatch, useSelector } from 'react-redux';
import LocationsManegement from '@/components/locationRegistring/LocationsManegement';
import { ElementWithLoadingState, IllustrationCard, P } from '@abdulrhmangoni/am-store-library';
import { setUserLocations } from '@/state-management/locations_slice';
import useLocationActions from '@/hooks/useLocationActions';

export default function LocationsManegementPage() {

    const { fetchLocations } = useLocationActions();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.userData?._id);
    const { locationsList } = useSelector(state => state.locations);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (!locationsList) {
            setIsLoading(true);
            fetchLocations()
                .then(userLocations => {
                    dispatch(setUserLocations(userLocations));
                    isError && setIsError(false);
                })
                .catch(() => { !isError && setIsError(true); })
                .finally(() => setIsLoading(false));
        }
    }, [locationsList, userId]);

    useEffect(() => { setRender(true) }, []);

    if (render) {
        if ((isLoading || locationsList)) {
            return (
                <Box className="flex-column gap2">
                    <ElementWithLoadingState
                        isLoading={isLoading}
                        height={200}
                        element={
                            <Box>
                                <P sx={{ p: "8px 16px", bgcolor: "background.paper" }} variant='h6'>
                                    Selected Location
                                </P>
                                <Divider />
                                <SelectedLocationCard style={{ p: 1 }} />
                            </Box>
                        }
                    />
                    <ElementWithLoadingState
                        height={500}
                        isLoading={isLoading}
                        element={<LocationsManegement />}
                    />
                </Box>
            );
        }
        else if (isError) {
            <IllustrationCard
                title='Fetching locations failed'
                message='Fetching your locations data failed for unknown reason'
                disableHeight
            >
                <Box className="flex-row-center">
                    <Button onClick={() => refetch()} variant='contained'>Retry</Button>
                </Box>
            </IllustrationCard>
        }
    }
}