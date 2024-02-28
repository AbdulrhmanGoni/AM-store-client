"use client"
import { Box, Button, Divider } from '@mui/material';
import SelectedLocationCard from '@/components/locationRegistring/SelectedLocationCard';
import LocationsManegement from '@/components/locationRegistring/LocationsManegement';
import { ElementWithLoadingState, IllustrationCard, P } from '@abdulrhmangoni/am-store-library';
import useUserLocations from '@/hooks/useUserLocations';

export default function LocationsManegementPage() {

    const {
        isLoading,
        isError,
        isFetched,
        refetch,
        locationsList
    } = useUserLocations();

    if (isFetched) {
        if (isError) {
            <IllustrationCard
                title='Fetching locations failed'
                message='Fetching your locations data failed for unknown reason'
                disableHeight
            >
                <Box className="flex-row-center">
                    <Button onClick={refetch} variant='contained'>Retry</Button>
                </Box>
            </IllustrationCard>
        }
        else if ((isLoading || locationsList)) {
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
    }
}