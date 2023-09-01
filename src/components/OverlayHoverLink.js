import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OverlayHoverLink = ({ target, linkStyle, bgStyle, text, customAction }) => {

    const navigate = useNavigate();

    function action() {
        if (customAction) {
            customAction();
        } else {
            navigate(target);
        }
        return
    }

    return (
        <Box sx={{
            "&:hover": { opacity: 1 }, transition: ".4s",
            position: "absolute", width: "100%", opacity: 0,
            height: "100%", top: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            backgroundColor: "#00000054", color: "white", ...bgStyle
        }}>
            <Typography variant='body2'
                sx={{ "&:hover": { textDecoration: "underline" }, ...linkStyle }}
                onClick={() => action()}
            >
                {text ?? "More Details"}
            </Typography>
        </Box>
    );
}

export default OverlayHoverLink;
