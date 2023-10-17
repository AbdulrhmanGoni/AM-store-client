"use client"
import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function themeHandeler(isLightMode) {

    const theme = createTheme({
        palette: {
            mode: isLightMode ? "light" : "dark",
            primary: { main: indigo["A400"] },
            action: { hover: "3d5afe4d" },
            background: {
                default: isLightMode ? "#f3f3f3" : "#111936",
                paper: isLightMode ? "#fff" : "#0b163f"
            },
            typography: {
                fontFamily: roboto.style.fontFamily,
                lineHeight: "1.3"
            },
        }
    });

    return theme;
}
