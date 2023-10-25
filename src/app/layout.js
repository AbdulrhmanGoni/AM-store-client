"use client"
import "@abdulrhmangoni/am-store-library/dist/cjs/gloabal.css"
import './global.css'
import { createContext } from "react";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from "@mui/material";
import themeHandeler, { roboto } from "@/functions/themeHandeler";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import dataCenter from "@/dataBase/dataCenter"
import AppWrapper from "./AppWrapper";
import useModeType from "@/hooks/useModeType";

export const ThemeContext = createContext(null);

export default function RootLayout({ children }) {

  const [isLightMode, toggleMode] = useModeType();

  return (
    <Provider store={dataCenter}>
      <ThemeProvider theme={themeHandeler(isLightMode)}>
        <CookiesProvider>
          <ThemeContext.Provider value={{ toggleMode, isLightMode }}>
            <CssBaseline />
            <AppWrapper>
              <SnackbarProvider style={{ fontFamily: roboto.style.fontFamily }}>
                {children}
              </SnackbarProvider>
            </AppWrapper>
          </ThemeContext.Provider>
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  );
}