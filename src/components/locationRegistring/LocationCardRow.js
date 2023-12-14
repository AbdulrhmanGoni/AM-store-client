import { Box, useMediaQuery } from "@mui/material"
import { P } from "@abdulrhmangoni/am-store-library";

export default function LocationCardRow({ theKey, value, children, sx }) {

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
                        <P width={width600px ? 70 : 100} variant='subtitle2'>{theKey}: </P>
                        <P variant='body2'>{value}</P>
                    </>
            }
        </Box>
    )
}