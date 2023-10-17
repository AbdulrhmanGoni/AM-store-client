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
        <Box sx={{
            "&:hover": { opacity: disable ? 0 : 1 },
            transition: ".4s",
            position: "absolute", width: "100%", opacity: 0,
            height: "100%", top: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            backgroundColor: "#00000054", color: "white", ...bgStyle
        }}>
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
