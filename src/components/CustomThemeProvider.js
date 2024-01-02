import useCustomTheme from '@/hooks/useCustomTheme';
import { ThemeProvider } from '@emotion/react';
import { createContext } from "react";

export const SwitchThemeContext = createContext({ switchTheme() { }, mode: "dark" })

export default function CustomThemeProvider({ children }) {

    const { theme, switchTheme } = useCustomTheme();

    return (
        <ThemeProvider theme={theme}>
            <SwitchThemeContext.Provider value={{ switchTheme, mede: theme.palette.mode }}>
                {children}
            </SwitchThemeContext.Provider>
        </ThemeProvider>
    )
}
