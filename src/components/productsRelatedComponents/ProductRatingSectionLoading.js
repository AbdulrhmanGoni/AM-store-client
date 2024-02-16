import { Box, Skeleton } from "@mui/material";

export default function ProductRatingSectionLoading() {
    return (
        <>
            <Box sx={{ alignSelf: "flex-start" }} className="flex-row gap1">
                <Skeleton variant="rounded" width={25} height={25} />
                <Skeleton variant="rounded" width={140} height={25} />
            </Box>
            <Box className="flex-column">
                {
                    [5, 4, 3, 2, 1].map((num) => {
                        return (
                            <Box key={num} className="flex-row-center-start gap2" mb={1}>
                                <Skeleton variant="rounded" width={43} height={14} />
                                <Skeleton variant="rounded" width={100} height={14} />
                                <Skeleton variant="rounded" width={30} height={14} />
                            </Box>
                        )
                    })
                }
            </Box>
        </>
    )
}
