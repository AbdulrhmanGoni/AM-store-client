"use client"
import pagesSpaces from "@/CONSTANTS/pagesSpaces"
import PageLayout from "@/components/PageLayout"
import { Box } from "@mui/material"

export default function Layout({ children }) {

    return (
        <PageLayout
            signUpRequired
            title="Email Verification"
            maxWidth="md"
        >
            <Box
                className="flex-center full-width full-height"
                sx={{
                    textAlign: "center",
                    p: pagesSpaces,
                    "& MuiBox-root": {
                        m: { xs: 0, sm: 1 }
                    }
                }}
            >
                {children}
            </Box>
        </PageLayout>
    )
}
