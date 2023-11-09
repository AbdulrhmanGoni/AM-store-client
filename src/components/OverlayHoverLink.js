import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

const OverlayHoverLink = ({ target, linkStyle, bgStyle, text, customAction, disable }) => {

    const { push } = useRouter();

    function action() {
        if (!disable) {
            if (customAction) customAction();
            else push(target)
        }
    }

    return (
        <Box
            className="flex-center full-width full-height"
            sx={{
                "&:hover": { opacity: disable ? 0 : 1 },
                transition: ".4s",
                position: "absolute", 
                opacity: 0, top: 0, 
                backgroundColor: "#00000054", 
                color: "white", 
                ...bgStyle
            }}
        >
            <Typography variant='body2'
                sx={{
                    cursor: disable ? "default" : "pointer",
                    "&:hover": { textDecoration: "underline" },
                    ...linkStyle
                }}
                onClick={() => action()}
            >
                {text ?? "More Details"}
            </Typography>
        </Box>
    );
}

export default OverlayHoverLink;
