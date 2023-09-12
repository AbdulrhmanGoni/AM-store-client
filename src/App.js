import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import themeHandeler from "./functions/themeHandeler";
import { CookiesProvider } from "react-cookie";
import { ErrorThrower, LoadingCircle, LoadingPage } from "@abdulrhmangoni/am-store-library";
import useUserLogging from "./hooks/useUserLogging";

export const ThemeContext = createContext(null);

function App() {

  const [isLightMode, toggleMode] = useState(JSON.parse(localStorage.getItem("isLightMode")));
  const { isLoading, isNetworkError, isServerError } = useUserLogging();

  return (
    <ThemeProvider theme={themeHandeler(isLightMode)}>
      <CookiesProvider>
        <ThemeContext.Provider value={{ toggleMode, isLightMode }}>
          <CssBaseline />
          <SnackbarProvider>
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
                    : <Outlet />
            }
            <LoadingCircle staticCircle darkBg />
          </SnackbarProvider>
        </ThemeContext.Provider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
