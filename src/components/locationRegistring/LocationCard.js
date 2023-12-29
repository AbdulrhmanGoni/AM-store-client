import { Box, CircularProgress, Divider, IconButton, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Delete, LocationOn } from '@mui/icons-material';
import { ActionAlert, P } from '@abdulrhmangoni/am-store-library';
import { useParams } from 'next/navigation';
import LocationCardRow from './LocationCardRow';
import useLocationActions from '@/hooks/useLocationActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { deleteLocation_localy } from '@/state-management/locations_slice';
import { useState } from 'react';

export default function LocationCard({ locationData, children, id, isSelected, setTheSelected }) {

    const dispatch = useDispatch();
    const { deleteLocation } = useLocationActions();
    const { message } = useSpeedMessage();
    const { pagePath } = useParams();
    const [loading, setLoading] = useState(false);

    function deleteTheLocation() {
        setLoading(true);
        deleteLocation(id)
            .then(() => dispatch(deleteLocation_localy(id)))
            .catch(() => message("deleting the location failed"))
            .finally(() => setLoading(false));
    }

    const { country, city, street, theName, phone, type } = locationData;

    return (
        <Box position="relative">
            <Paper
                onClick={() => setTheSelected(id)}
                sx={{
                    border: "solid 1px",
                    borderColor: isSelected === id ? "primary.main" : "divider",
                    p: "4px 0px"
                }}
            >
                <LocationCardRow sx={{ p: "0px 0px 0px 12px" }}>
                    <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
                    <P>{type}</P>
                    <LocationCardRow sx={{ flexGrow: 1, justifyContent: "flex-start", ml: 2, p: "8px 0px" }}>
                        {children}
                    </LocationCardRow>
                </LocationCardRow>
                <Divider sx={{ m: "4px 0px" }} />
                <LocationCardRow theKey="Name" value={theName} />
                <Divider sx={{ m: "4px 0px" }} />
                <LocationCardRow theKey="Address" value={[country, city, street].join(", ")} />
                <Divider sx={{ m: "4px 0px" }} />
                <LocationCardRow theKey="Phone" value={phone} />
            </Paper>
            {
                pagePath !== "checkout" &&
                <ActionAlert
                    action={deleteTheLocation}
                    title="delete the location"
                    message="know that you can't undo if you continue this process"
                >
                    <IconButton
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        color={loading ? "info" : "error"}
                    >
                        {loading ? <CircularProgress size={22} /> : <Delete />}
                    </IconButton>
                </ActionAlert>
            }
        </Box>
    );
}