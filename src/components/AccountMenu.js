import { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { FavoriteIconC, ShoppingCartIconC, UserAccountIconC } from './main_Icons_Links';
import { useDispatch, useSelector } from 'react-redux';
import { Feedback, Inbox, LocationOn, Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userLogOut } from '../dataBase/userData_slice';
import SwitchTheme from './SwitchTheme';
import SendEmailForm from './SendEmailForm';
import { useCookies } from 'react-cookie';


export default function AccountMenu() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [, , removeCookies] = useCookies();

    const [anchorEl, setAnchorEl] = useState(null);
    const [feedbackFormState, setOpenFeedbackState] = useState(false);
    const open = Boolean(anchorEl);

    const { userData } = useSelector(state => state);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goTo = (path, auth = false) => {
        if (auth) {
            if (userData) {
                navigate(path);
                setAnchorEl(null);
            } else {
                navigate("/log-in");
                setAnchorEl(null);
            }
        } else {
            navigate(path);
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
        dispatch(userLogOut());
        window.location.replace("/");
        window.location.reload();
        removeCookies("userId");
        removeCookies("access-token");
    };

    function openFeedbackForm() {
        setOpenFeedbackState(true);
        setAnchorEl(null);
    };


    return (
        <>
            <Box
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <UserAccountIconC />
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
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
                            color: "primary.main"
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => goTo("/user-profile", true)}>
                    <ListItemIcon>
                        <UserAccountIconC />
                    </ListItemIcon>
                    {userData ? "Profile" : "Log In"}
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => goTo("/shopping-cart")}>
                    <ListItemIcon>
                        <ShoppingCartIconC />
                    </ListItemIcon>
                    Shopping Cart
                </MenuItem>
                <MenuItem onClick={() => goTo("/favorite")}>
                    <ListItemIcon>
                        <FavoriteIconC />
                    </ListItemIcon>
                    Favorite
                </MenuItem>
                <MenuItem onClick={() => goTo("/orders")}>
                    <ListItemIcon>
                        <Inbox />
                    </ListItemIcon>
                    Orders
                </MenuItem>
                <MenuItem onClick={() => goTo("/locations-Management")}>
                    <ListItemIcon>
                        <LocationOn />
                    </ListItemIcon>
                    Address
                </MenuItem>
                <MenuItem onClick={() => goTo("/payment-Methods-Management")}>
                    <ListItemIcon>
                        <Payment />
                    </ListItemIcon>
                    Payment
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <SwitchTheme />
                    </ListItemIcon>
                    Theme
                </MenuItem>
                <Divider />
                <MenuItem onClick={openFeedbackForm}>
                    <ListItemIcon>
                        <Feedback />
                    </ListItemIcon>
                    Send Feedback
                </MenuItem>
                <LogoutButton />
            </Menu>
            <SendEmailForm open={feedbackFormState} close={() => setOpenFeedbackState(false)} />
        </>
    );
}