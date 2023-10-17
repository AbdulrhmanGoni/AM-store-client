"use client"
import ProductCardHorizontally from '@/components/ProductCardHorizontally';
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import { CleaningServices, Payment } from '@mui/icons-material';
import Summary from '@/components/Summary';
import { clearCart } from '@/dataBase/actions/shoppingCart_slice_actions';
import { clearCart_localy } from '@/dataBase/shoppingCart_slice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { ErrorThrower, ActionAlert } from '@abdulrhmangoni/am-store-library';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function ShoppingCartPage() {

    const { push } = useRouter();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();

    const shoppingCart = useSelector(state => state.shoppingCart);
    const userData = useSelector(state => state.userData);

    function IfTheCartValidToCheckout() {
        if (!shoppingCart.every(pro => pro.amount)) {
            message("there is item in your cart out of stock", "error", 10000);
            return false;
        }
        else if (!shoppingCart.every(pro => pro.count <= pro.amount)) {
            message("there is item in your cart its amount decremented", "error", 10000);
            return false;
        } else return true;
    }

    function goToCheckoutPage() {
        if (userData && shoppingCart.length) {
            if (IfTheCartValidToCheckout()) {
                push("/checkout");
            }
        } else {
            push("/sing-up");
        }
    }

    function clearShoppingCart() {
        if (userData) dispatch(clearCart(userData._id))
        else { dispatch(clearCart_localy()) }
    }

    return shoppingCart.length ?
        <Grid container spacing={2} sx={{ mb: { xs: "43px" } }}>
            <Grid item md={4} width="100%">
                <Summary />
                <Button
                    onClick={goToCheckoutPage}
                    variant='contained'
                    sx={{ mt: 1, width: "100%", bottom: "0", left: "0", zIndex: "500", position: { xs: "fixed", md: "relative" } }}
                    startIcon={<Payment />}
                    size="large"
                >
                    Checkout
                </Button>
            </Grid>
            <Grid item md={8} width="100%">
                <Box sx={{ display: "flex", justifyContent: "space-between", p: 1, bgcolor: "primary.main", color: "white" }}>
                    <Typography variant='h6' sx={{ fontWeight: "bold" }}>Products In Cart</Typography>
                    <ActionAlert
                        title="Clear shopping cart"
                        message="Are you sure you want to remove all products in shopping cart?"
                        action={clearShoppingCart}
                    >
                        <Button
                            variant='contained'
                            size='small'
                            startIcon={<CleaningServices />}
                            color='error'>
                            Clear Cart
                        </Button>
                    </ActionAlert>
                </Box>
                <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 57px - 65px)" }} >
                    <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {shoppingCart.map((product) => {
                            return (
                                <ListItem disablePadding key={product._id}>
                                    <ProductCardHorizontally
                                        id={product._id}
                                        images={product.images}
                                        title={product.title}
                                        description={product.description}
                                        price={product.price}
                                        amount={product.amount}
                                        theProduct={product}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Grid>
        </Grid>
        : <ErrorThrower
            hideAlertMsg
            title="Shopping cart is empty"
            illustratorType='empty'
        />
}