import { Alert, Box, Divider, IconButton, Paper, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, PinDrop } from '@mui/icons-material';
import { deleteLocation } from '../../dataBase/actions/locations_slice_actions';
import { useParams } from 'react-router-dom';
import ActionAlert from '../ActionAlert';

const Row = ({ theKey, value, children, sx }) => {

    const width600px = useMediaQuery("(max-width: 600px)");

    return (
        <Box sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            p: "6px 16px", ...sx
        }}>
            {
                children ?
                    children
                    :
                    <>
                        <Typography width={width600px ? 70 : 100} variant='subtitle2'>{theKey}: </Typography>
                        <Typography variant='body2'>{value}</Typography>
                    </>
            }
        </Box>
    )
}

const LocationCard = ({ locationData, children, id, isSelected, setTheSelected }) => {

    const { pagePath } = useParams();

    const { country, city, street, theName, phone, type } = locationData;
    const userData = useSelector(state => state.userData);

    const dispatch = useDispatch();

    function deleteCard() {
        dispatch(deleteLocation({ userId: userData._id, locationId: id }));
    }

    return (
        <Box sx={{ position: "relative" }}>
            {
                pagePath !== "checkout" &&
                <ActionAlert
                    action={() => deleteCard()}
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
                <Row>
                    <PinDrop sx={{ color: 'primary.main', mr: 1 }} /><Typography>{type}</Typography>
                    <Row sx={{ flexGrow: 1, justifyContent: "flex-start", ml: 2, p: "8px 0px" }}>
                        {children}
                    </Row>
                </Row>
                <Divider />
                <Row theKey="Name" value={theName} />
                <Divider />
                <Row theKey="Address" value={[country, city, street].join(", ")} />
                <Divider />
                <Row theKey="Phone" value={phone} />
            </Paper>
        </Box>
    );
}

export const SelectedLocationCard = ({ style, icon }) => {

    const { selectedLocation, locationsList } = useSelector(state => state.locations);

    if (selectedLocation) {
        const { country, city, street, theName, phone, type } = selectedLocation;
        return (
            <Paper sx={style}>
                <Row sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                        <PinDrop sx={{ color: 'primary.main', mr: 1 }} />{type}
                    </Typography>
                    {icon}
                </Row>
                <Row theKey="Name" value={theName} />
                <Row theKey="Address" value={[country, city, street].join(", ")} />
                <Row theKey="Phone" value={phone} />
            </Paper>
        );
    } else return (
        <Alert variant="outlined" severity="warning">
            {
                locationsList.length > 0 ?
                    "You Didn't Select Any Location As Selected"
                    :
                    "You Didn't Add Your Location Yet"
            }
        </Alert>
    )
}


export default LocationCard;
