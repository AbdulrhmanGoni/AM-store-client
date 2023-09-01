import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';


export default function themeHandeler(isLightMode) {

    const theme = createTheme({
        palette: {
            mode: isLightMode ? "light" : "dark",
            primary: { main: indigo["A400"] },
            action: { hover: "3d5afe4d" },
            background: {
                default: isLightMode ? "#f3f3f3" : "#111936",
                paper: isLightMode ? "#fff" : "#0b163f"
            }
        }
    });

    return theme;
}
