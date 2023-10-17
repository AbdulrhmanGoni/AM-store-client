"use client"
import { createContext } from "react";
import useUserLogging from "@/hooks/useUserLogging";
import { ErrorThrower, LoadingCircle, LoadingPage } from "@abdulrhmangoni/am-store-library";

export const ThemeContext = createContext(null);

export default function AppWrapper({ children }) {

    const { isLoading, isNetworkError, isServerError } = useUserLogging();

    return (
        <html lang="en">
            <body>
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
                                : [children]
                }
                <LoadingCircle staticCircle darkBg />
            </body>
        </html>
    );
}
