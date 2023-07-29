import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { useDispatch } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LoadingCircle from "./components/LoadingCircle";
import themeHandeler from "./functions/themeHandeler";
import { CookiesProvider, useCookies } from "react-cookie";
import useFetchState from "./hooks/useFetchState";
import { setUserData } from "./dataBase/userData_slice";
import { setCart_localy } from "./dataBase/shoppingCart_slice";
import { setFavorites_localy } from "./dataBase/favorites_slice";
import customFetchFunc from "./functions/customFetch";
import ErrorPage from "./components/ErrorPage";

export const ThemeContext = createContext(null);

function App() {

  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const [isLightMode, toggleMode] = useState(JSON.parse(localStorage.getItem("isLightMode")));
  const { isLoading, isError, setState } = useFetchState(null);
  useEffect(() => {
    const userId = cookies.userId;
    if (userId) {
      setState("loading");
      customFetchFunc(`log-in/${userId}`)
        .then(data => {
          dispatch(setUserData(data.userData));
          dispatch(setCart_localy(data.shoppingCart));
          dispatch(setFavorites_localy(data.favorites));
          setState("fulfilled");
        })
        .catch(() => setState("error"))
    }
  }, []);

  return (
    <ThemeProvider theme={themeHandeler(isLightMode)}>
      <CookiesProvider>
        <ThemeContext.Provider value={{ toggleMode, isLightMode }}>
          <CssBaseline />
          <SnackbarProvider>
            {
              isLoading ? <LoadingCircle darkBg />
                : isError ? <ErrorPage
                  message="There is unexpected error from the server, refresh the page or come back later"
                  title="Server Error!"
                  customIllustrate={require("./images/server-error.png")}
                  fullPage withRefreshButton
                />
                  : <Outlet />
            }
            <LoadingCircle id="loadingCircle" darkBg />
          </SnackbarProvider>
        </ThemeContext.Provider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
