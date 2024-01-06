import { Avatar, useTheme } from '@mui/material';

export default function AMLogo({ sx }) {
    const { palette: { mode } } = useTheme()
    return (
        <Avatar
            src={`/AM-Stroe-Logo-${mode == "dark" ? "light" : "dark"}.png`}
            alt='AM-Store-Logo.png'
            sx={{
                width: "75px",
                height: "50px",
                userSelect: "none",
                p: 0.5,
                borderRadius: 0,
                bgcolor: "transparent",
                ...sx
            }}
        />
    )
}
