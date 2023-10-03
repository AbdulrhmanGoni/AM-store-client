import {
    AppBar, Container, Box, Toolbar, IconButton, Typography, useMediaQuery
} from '@mui/material';
import TotalPriceInCart from './TotalPriceInCart';
import AccountMenu from './AccountMenu';
import { ShoppingCartIconC, FavoriteIconC } from './main_Icons_Links';
import Logo from './Logo';
import { SearchForProductsField } from '@abdulrhmangoni/am-store-library';
import { host } from '../CONSTANT/hostName';
import { ReadMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const media = useMediaQuery("(min-width: 700px)");
    const navigate = useNavigate();

    return (
        <Box>
            <Toolbar />
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar sx={{ padding: "0 !important" }}>
                        <Logo />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{ display: { xs: 'none', sm: 'block' }, overflow: "visible", mr: 2 }}
                        >
                            AM STORE
                        </Typography>
                        <SearchForProductsField
                            dominName={`${host}/`}
                            fieldSize='small'
                            endItemIcon={<ReadMore />}
                            actionWithProductId={(id) => { navigate(`product-details/${id}`) }}
                        />
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 2 }, alignItems: "center", pl: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {media && <TotalPriceInCart />}
                                <IconButton
                                    size="small"
                                    aria-label="show Shopping Cart Content"
                                    color="inherit">
                                    <ShoppingCartIconC />
                                </IconButton>
                            </Box>
                            <IconButton
                                size="small"
                                aria-label="show favoriets List"
                                color="inherit"
                            >
                                <FavoriteIconC />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="show favoriets List"
                                color="inherit"
                            >
                                <AccountMenu />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}