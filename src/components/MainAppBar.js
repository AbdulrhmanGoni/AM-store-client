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

export default function MainAppBar() {

    const media = useMediaQuery("(min-width: 700px)");
    const { push } = useRouter();

    return (
        <Box>
            <Toolbar />
            <AppBar position="fixed">
                <Container sx={{ p: { xs: "0px 8px", sm: "0px 16px" } }} maxWidth="lg">
                    <Toolbar color='icons' sx={{ padding: "0 !important" }}>
                        <P
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                overflow: "visible",
                                mr: 2,
                                fontWeight: "bold"
                            }}
                            variant="h6"
                            noWrap
                        >
                            AM STORE
                        </P>
                        <SearchForProductsField
                            hostName={host}
                            fieldSize='small'
                            endItemIcon={<ReadMore />}
                            onEnter={(searchInput) => {
                                !!searchInput && push(`products/?title=${searchInput}`)
                            }}
                            actionWithProductId={(id) => { push(`products/${id}`) }}
                        />
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 2 }, alignItems: "center", pl: 1 }}>
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