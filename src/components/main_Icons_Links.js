"use client"
import { ShoppingCart, FolderSpecial, AccountCircle, Home } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';
import { useRouter } from 'next/navigation';

const fs = { fontSize: "1.7rem !important" };

export const ShoppingCartIconC = ({ color }) => {

    const { push } = useRouter();
    const shoppingCart = useSelector(state => state.shoppingCart);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (shoppingCart) {
            setCount(shoppingCart.length);
        }
    }, [shoppingCart])

    return (
        <Badge color="primary" badgeContent={count}>
            <ShoppingCart color={color} onClick={() => push("/shopping-cart")} sx={fs} />
        </Badge>
    );
}

export const FavoriteIconC = ({ color }) => {

    const { push } = useRouter();

    const favorites = useSelector(state => state.favorites);

    return (
        <Badge color="primary" badgeContent={favorites ? favorites.length : 0}>
            <FolderSpecial color={color} onClick={() => push("/favorites")} sx={fs} />
        </Badge>
    );
}

export const UserAccountIconC = ({ clickEvent = false, color }) => {

    const push = useRouter();

    const userData = useSelector(state => state.userData);

    function handleClick() {
        if (clickEvent) {
            if (userData) {
                push("/user-profile");
            } else {
                push("/log-in");
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
        path: "/favorites",
        icon: <FavoriteIconC />
    },
    {
        name: "My Account",
        path: "/user-account",
        icon: <AccountMenu />
    },
]