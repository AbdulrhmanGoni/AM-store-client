"use client"
import "@abdulrhmangoni/am-store-library/dist/cjs/global.css"
import './global.css'
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import dataCenter from "@/state-management/dataCenter"
import AppWrapper from "./AppWrapper";
import CustomThemeProvider from "@/components/CustomThemeProvider";


export default function RootLayout({ children }) {
  return (
    <Provider store={dataCenter}>
      <CustomThemeProvider>
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