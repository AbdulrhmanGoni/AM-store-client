import { LocationOn, PinDrop } from "@mui/icons-material";
import { Alert, Divider, Paper, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LocationCardRow from "./LocationCardRow";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useLocationActions from "@/hooks/useLocationActions";
import { setUserLocations } from "@/state-management/locations_slice";
import LocationsManegementWindow from "./LocationsManegementWindow";
import { P, FetchFailedAlert } from "@abdulrhmangoni/am-store-library";


export default function SelectedLocationCard({ style, actionIcon }) {

    const pageUrl = usePathname();
    const { fetchLocations } = useLocationActions();
    const dispatch = useDispatch();
    const { selectedLocation, locationsList } = useSelector(state => state.locations);
    const userId = useSelector(state => state.userData?._id);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [render, setRender] = useState(false);
    const [refetched, setRefetch] = useState(false);

    useEffect(() => {
        if (!locationsList) {
            setIsLoading(true)
            fetchLocations()
                .then(userLocations => {
                    dispatch(setUserLocations(userLocations));
                    isError && setIsError(false);
                })
                .catch(() => { !isError && setIsError(true); })
                .finally(() => setIsLoading(false));
        }
    }, [selectedLocation, userId, refetched]);

    useEffect(() => { setRender(true) }, []);

    if (render) {
        if (selectedLocation) {
            const { country, city, street, theName, phone, type } = selectedLocation;
            return (
                <Paper sx={{ ...style, p: isLoading ? 2 : 1 }}>
                    <LocationCardRow sx={{ justifyContent: "space-between", p: isLoading ? 0 : "4px 12px" }}>
                        <P className="flex-row-center">
                            <PinDrop sx={{ color: 'primary.main', mr: 1 }} />
                            {type}
                        </P>
                        {actionIcon}
                    </LocationCardRow>
                    <Divider sx={{ m: "4px 0px" }} />
                    <LocationCardRow theKey="Name" value={theName} />
                    <Divider sx={{ m: "4px 0px" }} />
                    <LocationCardRow theKey="Address" value={[country, city, street].join(", ")} />
                    <Divider sx={{ m: "4px 0px" }} />
                    <LocationCardRow theKey="Phone" value={phone} />
                </Paper>
            )
        }
        else if (isLoading) return <SelectedLocationCardLoading style={style} />
        else if (isError) return (
            <FetchFailedAlert
                message="Failed to fetch the selected location"
                refetch={() => setRefetch(s => ++s)}
            />
        )
        else return (<Alert
            action={
                !pageUrl.match("addresses-management") &&
                <LocationsManegementWindow
                    buttonProps={{
                        size: 'small',
                        startIcon: <LocationOn />,
                        color: "warning",
                        children: "Open Locations Manegement"
                    }}
                />
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

function SelectedLocationCardLoading({ style }) {
    return (
        <Paper sx={{ p: 2, ...style }}>
            <LocationCardRow sx={{ justifyContent: "space-between", p: 0 }}>
                <Skeleton variant="rounded" height={25} width={100} />
                <Skeleton variant="rounded" height={25} width={85} />
            </LocationCardRow>
            <Divider sx={{ m: "4px 0px" }} />
            <Skeleton variant="rounded" height={25} />
            <Divider sx={{ m: "4px 0px" }} />
            <Skeleton variant="rounded" height={25} />
            <Divider sx={{ m: "4px 0px" }} />
            <Skeleton variant="rounded" height={25} />
        </Paper>
    )
}
