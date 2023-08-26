import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LoadingCircle from "./components/LoadingCircle";
import themeHandeler from "./functions/themeHandeler";
import { CookiesProvider } from "react-cookie";
import { ErrorThrower } from "@abdulrhmangoni/am-store-library";
import useUserLogging from "./hooks/useUserLogging";

export const ThemeContext = createContext(null);

function App() {

  const [isLightMode, toggleMode] = useState(JSON.parse(localStorage.getItem("isLightMode")));
  const { isLoading, isError, isNetworkError, isFulfilled } = useUserLogging();

  return (
    <ThemeProvider theme={themeHandeler(isLightMode)}>
      <CookiesProvider>
        <ThemeContext.Provider value={{ toggleMode, isLightMode }}>
          <CssBaseline />
          <SnackbarProvider>
            {
              isLoading ? <LoadingCircle darkBg />
                : isNetworkError ? <ErrorThrower
                  title="Network Error"
                  message="There is problem in your internet, please check your internet"
                  customIllustrate={require("./images/no-network-error.png")}
                  fullPage withRefreshButton
                />
                  : isError ? <ErrorThrower
                    message="There is unexpected error from the server, refresh the page or come back later"
                    title="Server Error"
                    customIllustrate={require("./images/server-error.png")}
                    fullPage withRefreshButton
                  />
                    : isFulfilled ? <Outlet />
                      : null
            }
            <LoadingCircle id="loadingCircle" darkBg />
          </SnackbarProvider>
        </ThemeContext.Provider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
