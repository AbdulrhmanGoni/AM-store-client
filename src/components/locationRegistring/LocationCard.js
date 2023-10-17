import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, PinDrop } from '@mui/icons-material';
import { deleteLocation } from '@/dataBase/actions/locations_slice_actions';
import { ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useParams } from 'next/navigation';
import LocationCardRow from './LocationCardRow';

export default function LocationCard({ locationData, children, id, isSelected, setTheSelected }) {

    const dispatch = useDispatch();
    const { pagePath } = useParams();
    const userData = useSelector(state => state.userData);

    const { country, city, street, theName, phone, type } = locationData;

    return (
        <Box sx={{ position: "relative" }}>
            {
                pagePath !== "checkout" &&
                <ActionAlert
                    action={() => dispatch(deleteLocation({ userId: userData._id, locationId: id }))}
                    title="delete the location"
                    message="know that you can't undo if you continue this process"
                >
                    <IconButton
                        color='error'
                        sx={{
                            p: 1, zIndex: 100,
                            position: "absolute",
                            right: 0, top: 0
                        }}>
                        <Delete />
                    </IconButton>
                </ActionAlert>
            }
            <Paper
                sx={{
                    border: "solid 2px transparent",
                    borderColor: isSelected === id ? "primary.main" : null
                }}
                onClick={() => setTheSelected(id)}
            >
                <LocationCardRow>
                    <PinDrop sx={{ color: 'primary.main', mr: 1 }} /><Typography>{type}</Typography>
                    <LocationCardRow sx={{ flexGrow: 1, justifyContent: "flex-start", ml: 2, p: "8px 0px" }}>
                        {children}
                    </LocationCardRow>
                </LocationCardRow>
                <Divider />
                <LocationCardRow theKey="Name" value={theName} />
                <Divider />
                <LocationCardRow theKey="Address" value={[country, city, street].join(", ")} />
                <Divider />
                <LocationCardRow theKey="Phone" value={phone} />
            </Paper>
        </Box>
    );
}