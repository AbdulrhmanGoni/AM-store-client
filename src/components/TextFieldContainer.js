import { Box } from "@mui/material";

export default function TextFieldContainer({ children }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {children}
        </Box>
    )
}