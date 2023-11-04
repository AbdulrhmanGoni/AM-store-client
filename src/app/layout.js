"use client"
import "@abdulrhmangoni/am-store-library/dist/cjs/global.css"
import './global.css'
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import dataCenter from "@/dataBase/dataCenter"
import useCustomTheme from "@/hooks/useCustomTheme";
import AppWrapper from "./AppWrapper";


export default function RootLayout({ children }) {

  const theme = useCustomTheme();

  return (
    <Provider store={dataCenter}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <CssBaseline />
          <AppWrapper>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </AppWrapper>
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  );
}