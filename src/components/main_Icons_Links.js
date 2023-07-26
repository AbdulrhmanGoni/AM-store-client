import { ShoppingCart, FolderSpecial, AccountCircle, Home } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';

const fs = { fontSize: "1.7rem !important" };

export const ShoppingCartIconC = ({ color }) => {

    const navigate = useNavigate();
    const { shoppingCart } = useSelector(state => state);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (shoppingCart) {
            setCount(shoppingCart.length);
        }
    }, [shoppingCart])

    return (
        <Badge color="info" badgeContent={count}>
            <ShoppingCart color={color} onClick={() => navigate("/shopping-cart")} sx={fs} />
        </Badge>
    );
}

export const FavoriteIconC = ({ color }) => {

    const navigate = useNavigate();

    const { favorites } = useSelector(state => state);

    return (
        <Badge color="info" badgeContent={favorites ? favorites.length : 0}>
            <FolderSpecial color={color} onClick={() => navigate("/favorite")} sx={fs} />
        </Badge>
    );
}

export const UserAccountIconC = ({ clickEvent = false, color }) => {

    const navigate = useNavigate();

    const userData = useSelector(state => state.userData);

    function handleClick() {
        if (clickEvent) {
            if (userData) {
                navigate("/user-profile");
            } else {
                navigate("/log-in");
            }
        }
    }

    if (userData) {
        return (
            <Avatar
                sx={{ width: 28, height: 28, mb: { xs: "4px", sm: 0 }, bgcolor: "secondary.main", cursor: "pointer" }}
                onClick={handleClick}
                src={userData.avatar}>
                {userData.userName[0]}
            </Avatar>
        )
    }
    else {
        return (
            <Badge color="warning" variant={userData ? null : "dot"}>
                <AccountCircle color={color} sx={fs}
                    onClick={handleClick}
                />
            </Badge>
        )
    }
}

export const pagesLinks = [
    {
        name: "Home",
        path: "/",
        icon: <Home sx={fs} />
    },
    {
        name: "Shopping Cart",
        path: "/shopping-cart",
        icon: <ShoppingCartIconC />
    },
    {
        name: "Favorite",
        path: "/favorite",
        icon: <FavoriteIconC />
    },
    {
        name: "My Account",
        path: "/user-account",
        icon: <AccountMenu />
    },
]