"use client"
import useUserLogging from "@/hooks/useUserLogging";
import { ErrorThrower, LoadingCircle, LoadingPage } from "@abdulrhmangoni/am-store-library";
import { Box, useTheme } from "@mui/material";


export default function AppWrapper({ children }) {

    const { isLoading, isNetworkError, isServerError, renderApp } = useUserLogging();
    const { palette: { primary, background, text } } = useTheme();

    return (
        <Box
            lang="en"
            component="html"
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                "*::-webkit-scrollbar": { bgcolor: background.paper },
                "*::-webkit-scrollbar-thumb": { bgcolor: primary.main },
                "& input:autofill": {
                    boxShadow: `0 0 0 100px ${background.default} inset !important`,
                    WebkitTextFillColor: `${text.primary} !important`
                }
            }}
        >
            <Box component="body">
                {
                    isLoading ? <LoadingPage />
                        : isNetworkError ? <ErrorThrower
                            title="Network Error"
                            message="There is problem in your internet, please check your internet"
                            illustratorType="network"
                            fullPage withRefreshButton
                        />
                            : isServerError ? <ErrorThrower
                                message="There is unexpected error from the server, refresh the page or come back later"
                                title="Server Error"
                                illustratorType="server"
                                fullPage withRefreshButton
                            />
                                : renderApp && children
                }
                <LoadingCircle staticCircle darkBg />
            </Box>
        </Box>
    );
}
