import { Box, Typography, useMediaQuery } from "@mui/material"

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
                        <Typography width={width600px ? 70 : 100} variant='subtitle2'>{theKey}: </Typography>
                        <Typography variant='body2'>{value}</Typography>
                    </>
            }
        </Box>
    )
}