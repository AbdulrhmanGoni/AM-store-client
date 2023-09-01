import { Box } from '@mui/material';
import React from 'react';

const PageWidthBG = ({ bgImage, sx, children }) => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            minHeight: "100vh",
            color: "white",
            ...sx
        }}>
            {children}
        </Box>
    );
}

export default PageWidthBG;
