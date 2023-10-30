"use client"
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import mobileBarLinks from "./MobileBarLinks";
import { useRouter } from 'next/navigation';


export default function MobileBar() {

    const [currentPage, setPage] = useState(0);
    const { push } = useRouter()

    return (
        <BottomNavigation
            sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-around", p: "8px 0px",
                width: "100%", position: "fixed", height: "65px",
                zIndex: 500, bottom: 0, left: 0
            }}
            showLabels
            value={currentPage}
            onChange={(_, page) => { setPage(page) }}
        >
            {
                mobileBarLinks.map(
                    (link) => <BottomNavigationAction
                        key={link.name}
                        onClick={() => push(link.path)}
                        sx={{
                            p: 0,
                            maxWidth: "fit-content !important",
                            minWidth: "fit-content !important"
                        }}
                        label={link.name}
                        icon={link.icon}
                    />
                )
            }
        </BottomNavigation>
    );
}