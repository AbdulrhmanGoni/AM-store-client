"use client"
import { useState } from 'react';
import { Box, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import CustomUserAccountIcon from './CustomUserAccountIcon';
import CustomFavoriteIcon from './CustomFavoriteIcon';
import CustomShoppingCartIcon from './CustomShoppingCartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { Feedback, Inbox, LocationOn, Payment, Logout } from '@mui/icons-material';
import { userLogOut } from '@/dataBase/userData_slice';
import SwitchTheme from './SwitchTheme';
import SendEmailForm from './SendFeedbackForm';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const menulinks = [
    {
        path: "/user-profile",
        icon: <CustomUserAccountIcon />,
        title: "Profile",
        divider: true,
        auth: true
    },
    {
        path: "/shopping-cart",
        icon: <CustomShoppingCartIcon />,
        title: "Shopping Cart"
    },
    {
        path: "/favorites",
        icon: <CustomFavoriteIcon />,
        title: "Favorites"
    },
    {
        path: "/orders",
        icon: <Inbox />,
        title: "Orders"
    },
    {
        path: "/locations-management",
        icon: <LocationOn />,
        title: "Location"
    },
    {
        path: "/payment-methods-management",
        icon: <Payment />,
        title: "Payments",
        divider: true
    },
    {
        icon: <SwitchTheme />,
        title: "Theme",
        divider: true
    },
    {
        icon: <Feedback />,
        title: "Send Feedback",
    }
]

export default function AccountMenu() {

    const { push } = useRouter();
    const dispatch = useDispatch();
    const [, , removeCookies] = useCookies();
    const [anchorEl, setAnchorEl] = useState(null);
    const [feedbackFormState, setOpenFeedbackState] = useState(false);
    const userData = useSelector(state => state.userData);

    const goTo = (path, auth) => {
        if (auth) {
            if (userData) {
                push(path);
                setAnchorEl(null);
            } else {
                push("/log-in");
                setAnchorEl(null);
            }
        } else {
            push(path);
            setAnchorEl(null);
        }
    };

    function LogoutButton() {
        return (
            userData &&
            <>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Log Out
                </MenuItem>
            </>
        )
    }

    function logout() {
        removeCookies("userId");
        removeCookies("access-token");
        dispatch(userLogOut());
        window.location.replace("/");
        window.location.reload();
    };

    function openFeedbackForm() {
        setOpenFeedbackState(true);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Box
                onClick={(event) => { setAnchorEl(event.currentTarget) }}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <CustomUserAccountIcon />
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => { setAnchorEl(null) }}
                slotProps={
                    {
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 26,
                                    height: 26,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: { xs: "none", sm: 'block' },
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                                '& .MuiListItemIcon-root .MuiSvgIcon-root': {
                                    color: "icons.main"
                                },
                            }
                        }
                    }
                }
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    menulinks.map(({ title, path, icon, action, divider, auth }) => {
                        return [
                            <MenuItem
                                key={title}
                                onClick={
                                    path ? () => goTo(path, auth)
                                        : title === "Send Feedback" ? openFeedbackForm
                                            : action
                                }
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                {title === "Profile" ? userData ? "Profile" : "Log In" : title}
                            </MenuItem>
                            ,
                            divider && <Divider />
                        ]
                    })
                }
                <LogoutButton />
            </Menu>
            <SendEmailForm open={feedbackFormState} close={() => setOpenFeedbackState(false)} />
        </>
    );
}