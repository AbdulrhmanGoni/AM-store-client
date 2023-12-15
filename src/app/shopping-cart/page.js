"use client"
import ProductCardHorizontally from '@/components/ProductCardHorizontally';
import { Box, Button, Grid, List, ListItem, Paper } from '@mui/material';
import Summary from '@/components/Summary';
import { clearCart_localy } from '@/dataBase/shoppingCart_slice';
import { IllustrationCard, ActionAlert, P } from '@abdulrhmangoni/am-store-library';
import { useDispatch, useSelector } from 'react-redux';
import GoToCheckoutButton from '@/components/GoToCheckoutButton';
import useShoppingCartActions from '@/hooks/useShoppingCartActions';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';

export default function ShoppingCartPage() {

    const { clearCart } = useShoppingCartActions();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();

    const shoppingCart = useSelector(state => state.shoppingCart);
    const userData = useSelector(state => state.userData);

    function clearShoppingCart() {
        if (userData) {
            clearCart()
                .then(() => dispatch(clearCart_localy()))
                .catch(() => message("Clearing cart failed for unknown reason"))
        }
        else { dispatch(clearCart_localy()) };
    }

    return shoppingCart?.length ?
        <Grid container spacing={2} sx={{ mb: { xs: "43px" } }}>
            <Grid item md={4} width="100%">
                <Summary />
                <GoToCheckoutButton />
            </Grid>
            <Grid item md={8} width="100%">
                <Paper className="flex-row-center-between" sx={{ p: 1, }}>
                    <P variant='h6'>Products In Cart</P>
                    <ActionAlert
                        title="Clear shopping cart"
                        message="Are you sure you want to remove all products in shopping cart?"
                        action={clearShoppingCart}
                    >
                        <Button
                            variant='contained'
                            size='small'
                            startIcon={<Box sx={{ width: "17px" }} component="img" src='/clear-shopping-cart.svg' alt='clear cart' />}
                            color='error'
                            sx={{ fontSize: "0.7rem" }}
                        >
                            Clear Cart
                        </Button>
                    </ActionAlert>
                </Paper>
                <Box>
                    <List className='flex-column gap1'>
                        {
                            shoppingCart.map((product) => {
                                return (
                                    <ListItem disablePadding key={product._id}>
                                        <ProductCardHorizontally theProduct={product} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
            </Grid>
        </Grid>
        : <IllustrationCard
            hideAlertMsg
            title="Shopping cart is empty"
            illustratorType='empty'
        />
}