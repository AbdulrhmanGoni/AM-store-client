import { Box, Divider, Grid, Skeleton } from "@mui/material";

export default function loading() {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
                <Box width="100%">
                    <Skeleton variant="rounded" sx={{ mb: 1.5 }} width="100%" height={300} />
                    <Skeleton variant="rounded" width="100%" height={45} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1.5 }}>
                    <Skeleton variant="rounded" width="100%" height={42} />
                    <Skeleton variant="rounded" width="100%" height={100} />
                    <Skeleton variant="rounded" width={75} height={35} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Skeleton variant="rounded" width={120} height={25} />
                        <Skeleton variant="rounded" width={35} height={35} />
                    </Box>
                    <Skeleton variant="rounded" width={70} height={25} />
                    <Divider sx={{ margin: "1px 0px" }} />
                    <Skeleton variant="rounded" width="100%" height={45} />
                </Box>
            </Grid>
        </Grid>
    )
}
