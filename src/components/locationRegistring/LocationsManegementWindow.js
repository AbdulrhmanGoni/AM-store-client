"use "
import { Button } from '@mui/material'
import React, { useState } from 'react'
import LocationsManegement from './LocationsManegement'
import OverlayBg from '../OverlayBg';

export default function LocationsManegementWindow({ buttonProps }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                {...buttonProps}
            >
                {buttonProps?.children}
            </Button>
            {
                isOpen ?
                    <OverlayBg>
                        <LocationsManegement control={setIsOpen} float={true} />
                    </OverlayBg>
                    : null
            }
        </>
    )
}

