import { Box } from '@mui/material'

const OverlayBg = ({ children, style }) => {
    return (
        <Box
            className="flex-column-center full-width"
            sx={{
                position: "fixed",
                bgcolor: "#00000080",
                minHeight: "100vh",
                top: "50%", 
                left: "50%",
                height: "100%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                ...style
            }}>
            {children}
        </Box>
    );
}

export default OverlayBg;
