import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { pagesLinks } from "./main_Icons_Links";


export default function MobileBar() {

    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-around", p: "8px 0px",
                width: "100%", position: "fixed", height: "65px",
                zIndex: 500, bottom: 0, left: 0
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            {pagesLinks.map(
                (link) => <BottomNavigationAction key={link.name}
                    sx={{
                        p: 0,
                        maxWidth: "fit-content !important",
                        minWidth: "fit-content !important"
                    }}
                    label={link.name}
                    icon={link.icon}
                />
            )}
        </BottomNavigation>
    );
}