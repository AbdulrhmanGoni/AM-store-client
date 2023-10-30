"use client"
import { Home } from '@mui/icons-material';
import AccountMenu from './AccountMenu';
import CustomShoppingCartIcon from './CustomShoppingCartIcon';
import CustomFavoriteIcon from './CustomFavoriteIcon';

const links = [
    {
        name: "Home",
        path: "/",
        icon: <Home sx={{ fontSize: "1.7rem !important" }} />
    },
    {
        name: "Shopping Cart",
        path: "/shopping-cart",
        icon: <CustomShoppingCartIcon />
    },
    {
        name: "Favorite",
        path: "/favorites",
        icon: <CustomFavoriteIcon />
    },
    {
        name: "My Account",
        path: "/user-account",
        icon: <AccountMenu />
    },
]

export default links