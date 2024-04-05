'use client'
import { Refresh } from "@mui/icons-material"
import { Box, Button, Alert, AlertTitle } from "@mui/material"

export default function GlobalError({ reset }) {
    return (
        <html>
            <body>
                <Box sx={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Alert severity="error">
                        <AlertTitle>Unexpected Error</AlertTitle>
                        It may happened because of your internet or It server error,
                        refresh to try again or close the application and come back later.
                    </Alert>
                    <Button
                        onClick={() => reset()}
                        variant="contained"
                        startIcon={<Refresh />}
                    >
                        Try again
                    </Button>
                </Box>
            </body>
        </html>
    )
}