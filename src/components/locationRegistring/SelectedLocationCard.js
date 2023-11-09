import { LocationOn, PinDrop } from "@mui/icons-material";
import { Alert, Divider, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LocationCardRow from "./LocationCardRow";
import LMControl from "./LMControl";
import { useEffect, useState } from "react";
import { fetchLocations } from "@/dataBase/actions/locations_slice_actions";
import { usePathname } from "next/navigation";
import { ElementWithLoadingState } from "@abdulrhmangoni/am-store-library";

export default function SelectedLocationCard({ style, actionIcon }) {

    const pageUrl = usePathname();
    const dispatch = useDispatch();
    const { selectedLocation, locationsList } = useSelector(state => state.locations);
    const userId = useSelector(state => state.userData?._id);
    const [isLoading, setIsLoading] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (!locationsList) {
            setIsLoading(true)
            dispatch(fetchLocations(userId))
            setIsLoading(false)
        }
    }, [dispatch, locationsList, userId]);

    useEffect(() => { setRender(true) }, []);

    if (isLoading || selectedLocation || render) {
        const { country, city, street, theName, phone, type } = selectedLocation ?? {};
        return (
            <Paper sx={{ ...style, p: isLoading ? 2 : 1 }}>
                <LocationCardRow sx={{ justifyContent: "space-between", p: isLoading ? 0 : "" }}>
                    <ElementWithLoadingState
                        isLoading={isLoading}
                        height={25}
                        width={100}
                        element={
                            <Typography className="flex-row-center">
                                <PinDrop sx={{ color: 'primary.main', mr: 1 }} />
                                {type}
                            </Typography>
                        }
                    />
                    <ElementWithLoadingState
                        isLoading={isLoading}
                        height={25}
                        width={85}
                        element={actionIcon}
                    />
                </LocationCardRow>
                <Divider sx={{ m: "4px 0px" }} />
                <ElementWithLoadingState
                    isLoading={isLoading}
                    height={25}
                    element={<LocationCardRow theKey="Name" value={theName} />}
                />
                <Divider sx={{ m: "4px 0px" }} />
                <ElementWithLoadingState
                    isLoading={isLoading}
                    height={25}
                    element={<LocationCardRow theKey="Address" value={[country, city, street].join(", ")} />}
                />
                <Divider sx={{ m: "4px 0px" }} />
                <ElementWithLoadingState
                    isLoading={isLoading}
                    height={25}
                    element={<LocationCardRow theKey="Phone" value={phone} />}
                />
            </Paper>
        )
    }
    else if (render) {
        return (
            <Alert
                action={
                    !pageUrl.match("addresses-management") &&
                    <LMControl size='small' startIcon={<LocationOn />} text="Open Locations Manegement" />
                }
                sx={{ width: "100%", mb: 1, alignItems: "center" }}
                severity="warning">
                {
                    locationsList?.length > 0 ?
                        "You Didn't Select Any Location As Selected"
                        :
                        "You Didn't Add Your Location Yet"
                }
            </Alert>
        )
    }
}