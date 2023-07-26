import { Box } from '@mui/material'

const OverlayBg = ({ children, style }) => {
    return (
        <Box sx={{
            position: "fixed",
            bgcolor: "#00000080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "100vh",
            top: 0, left: 0,
            ...style
        }}>
            {children}
        </Box>
    );
}

export default OverlayBg;
