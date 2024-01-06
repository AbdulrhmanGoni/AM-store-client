"use client"
import {
    AppBar, Container, Box, Toolbar, IconButton, useMediaQuery
} from '@mui/material';
import TotalPriceInCart from './TotalPriceInCart';
import AccountMenu from './AccountMenu';
import CustomFavoriteIcon from './CustomFavoriteIcon';
import CustomShoppingCartIcon from './CustomShoppingCartIcon';
import { SearchForProductsField, P } from '@abdulrhmangoni/am-store-library';
import { host } from '@/CONSTANT/hostName';
import { ReadMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import AMLogo from './AMLogo';

export default function MainAppBar() {

    const media = useMediaQuery("(min-width: 700px)");
    const { push } = useRouter();

    return (
        <Box>
            <Toolbar />
            <AppBar position="fixed">
                <Container sx={{ p: { xs: "0px 8px", sm: "0px 16px" } }} maxWidth="lg">
                    <Toolbar color='icons' sx={{ p: "0 !important", gap: 1 }}>
                        <AMLogo transparent />
                        <SearchForProductsField
                            hostName={host}
                            fieldSize='small'
                            endItemIcon={<ReadMore />}
                            onEnter={(searchInput) => {
                                !!searchInput && push(`products/?title=${searchInput}`)
                            }}
                            actionWithProductId={(id) => { push(`products/${id}`) }}
                        />
                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                gap: 1, alignItems: "center"
                            }}
                        >
                            <Box className="flex-row-center">
                                {media && <TotalPriceInCart />}
                                <IconButton
                                    size="small"
                                    aria-label="show Shopping Cart Content"
                                    color="icons">
                                    <CustomShoppingCartIcon />
                                </IconButton>
                            </Box>
                            <IconButton
                                size="small"
                                aria-label="show favoriets List"
                                color="icons"
                            >
                                <CustomFavoriteIcon />
                            </IconButton>
                            <AccountMenu />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}