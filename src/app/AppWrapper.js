"use client"
import useUserLogging from "@/hooks/useUserLogging";
import { IllustrationCard, LoadingCircle, LoadingPage } from "@abdulrhmangoni/am-store-library";
import { Box, useTheme } from "@mui/material";

export default function AppWrapper({ children }) {

    const {
        isLoading,
        isNetworkError,
        isServerError,
        isUnexpected,
        renderApp
    } = useUserLogging();
    const { palette: { primary, background, text } } = useTheme();

    return (
        <Box
            lang="en"
            component="html"
            sx={{
                "*::-webkit-scrollbar": { bgcolor: "transparent" },
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
                        : isUnexpected ? <IllustrationCard
                            title="Uunexpected Error"
                            message="There is unexpected error happeneds, try refreshing the page"
                            illustratorType="unexpected"
                            fullPage withRefreshButton
                        />
                            : isServerError ? <IllustrationCard
                                title="Server Error"
                                message="There is unexpected error from the server, Come back later"
                                illustratorType="server"
                                fullPage withRefreshButton
                            />
                                : isNetworkError ? <IllustrationCard
                                    title="Network Error"
                                    message="There is problem in your internet, please check your internet"
                                    illustratorType="network"
                                    fullPage withRefreshButton
                                />
                                    : renderApp && children
                }
                {renderApp && <LoadingCircle staticCircle darkBg />}
            </Box>
        </Box>
    );
}
