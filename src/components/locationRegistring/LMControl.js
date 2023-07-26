import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import LocationManegement from './LocationManegement'

export default function LMControl({ startIcon, endIcon, text, variant, colorType, size }) {

    const [isOpen, setState] = useState(false);

    const OverlayLayer = ({ children }) => {
        return (
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#00000080",
                zIndex: 1000,
            }}>
                {children}
            </Box>
        )
    }

    return (
        <>
            <Button onClick={() => setState(true)} color={colorType} size={size} startIcon={startIcon} endIcon={endIcon}>
                {text}
            </Button>
            {
                isOpen ?
                    <OverlayLayer>
                        <LocationManegement control={setState} float={true} />
                    </OverlayLayer>
                    : null
            }
        </>
    )
}

