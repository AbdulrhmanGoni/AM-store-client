import { Box } from "@mui/material";

export default function TextFieldContainer({ children }) {
    return (
        <Box className="flex-row a-end gap1">
            {children}
        </Box>
    )
}