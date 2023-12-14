"use client"
import { createTheme, colors } from "@mui/material";
import { useCookies } from "react-cookie";


export default function useCustomTheme() {

    const [{ AM_Store_client_site_theme: mode }] = useCookies();
    const primaryColor = colors.indigo["A400"]
    const lightBackground = { default: "#f9f9f9", paper: "#fff" }
    const darkBackground = { default: "#111936", paper: "#0a1336" }
    const isLightMode = mode === "light"
    const textColor = isLightMode ? "#000" : "#fff"

    return createTheme({
        palette: {
            mode: isLightMode ? "light" : "dark",
            primary: { main: primaryColor },
            action: { hover: "3d5afe4d" },
            background: isLightMode ? lightBackground : darkBackground,
            icons: { main: isLightMode ? primaryColor : "#fff" },
            success: { main: "#66bb6a" },
        },
        typography: {
            allVariants: {
                color: textColor
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLightMode ? lightBackground.paper : darkBackground.paper,
                        color: textColor,
                    }
                }
            }
        }
    })
}

