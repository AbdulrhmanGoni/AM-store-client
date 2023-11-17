import { Box, CircularProgress, Divider, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, LocationOn } from '@mui/icons-material';
import { ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useParams } from 'next/navigation';
import LocationCardRow from './LocationCardRow';
import useLocationActions from '@/hooks/useLocationActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { deleteLocation_localy } from '@/dataBase/locations_slice';
import { useState } from 'react';

export default function LocationCard({ locationData, children, id, isSelected, setTheSelected }) {

    const dispatch = useDispatch();
    const { deleteLocation } = useLocationActions();
    const { message } = useSpeedMessage();
    const { pagePath } = useParams();
    const userData = useSelector(state => state.userData);
    const [loading, setLoading] = useState(false);

    function deleteTheLocation() {
        const payload = { userId: userData._id, locationId: id };
        setLoading(true);
        deleteLocation(payload)
            .then(() => dispatch(deleteLocation_localy(id)))
            .catch(() => message("deleting the location failed"))
            .finally(() => setLoading(false));
    }

    const { country, city, street, theName, phone, type } = locationData;

    return (
        <Box>
            <Paper
                sx={{
                    border: "solid 2px transparent",
                    borderColor: isSelected === id ? "primary.main" : null,
                    p: "4px 0px",
                    border: "solid 1px rgb(255, 255, 255, .12)"
                }}
                onClick={() => setTheSelected(id)}
            >
                <LocationCardRow sx={{ p: "0px 0px 0px 12px" }}>
                    <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>{type}</Typography>
                    <LocationCardRow sx={{ flexGrow: 1, justifyContent: "flex-start", ml: 2, p: "8px 0px" }}>
                        {children}
                    </LocationCardRow>
                    {
                        pagePath !== "checkout" &&
                        <ActionAlert
                            action={deleteTheLocation}
                            title="delete the location"
                            message="know that you can't undo if you continue this process"
                        >
                            <IconButton color={loading ? "info" : "error"}>
                                {loading ? <CircularProgress size={22} /> : <Delete />}
                            </IconButton>
                        </ActionAlert>
                    }
                </LocationCardRow>
                <Divider sx={{ m: "4px 0px" }} />
                <LocationCardRow theKey="Name" value={theName} />
                <Divider sx={{ m: "4px 0px" }} />
                <LocationCardRow theKey="Address" value={[country, city, street].join(", ")} />
                <Divider sx={{ m: "4px 0px" }} />
                <LocationCardRow theKey="Phone" value={phone} />
            </Paper>
        </Box>
    );
}