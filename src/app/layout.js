"use client"
import { CustomThemeProvider } from "@abdulrhmangoni/am-store-library"
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import dataCenter from "@/state-management/dataCenter"
import AppWrapper from "./AppWrapper";
import "@abdulrhmangoni/am-store-library/dist/cjs/global.css"


export default function RootLayout({ children }) {
  return (
    <Provider store={dataCenter}>
      <CustomThemeProvider site="the-store">
        <CssBaseline />
        <AppWrapper>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </AppWrapper>
      </CustomThemeProvider>
    </Provider>
  );
}