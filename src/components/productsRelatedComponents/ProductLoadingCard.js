import { Card, Skeleton, Box } from '@mui/material';

export function ProductLoadingCard({ cardWidth }) {

    return (
        <Card
            sx={{
                m: 0, gap: 1,
                width: cardWidth,
                display: "flex",
                flexDirection: "column"
            }}>
            <Skeleton variant="rectangular" sx={{ height: { xs: 120, sm: 185 } }} />
            <Box sx={{ display: "flex", flexDirection: "column", p: "0px 8px", gap: 1 }}>
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" sx={{ height: 15, width: "75%" }} />
                <Skeleton variant="rounded" sx={{ height: 32 }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", p: "0px 8px 8px" }}>
                <Skeleton variant="rounded" sx={{ height: 30, width: 30 }} />
                <Skeleton variant="rounded" sx={{ height: 30, width: 75 }} />
            </Box>
        </Card>
    );
}