import { useDispatch, useSelector } from 'react-redux';
import EmptyMassege from '../components/EmptyMassege';
import { WidthlyCard } from '../components/ProductCard';
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material';
import { CleaningServices, Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Summary from '../components/Summary';
import { clearCart } from '../dataBase/actions/shoppingCart_slice_actions';
import { clearCart_localy } from '../dataBase/shoppingCart_slice';
import { useSpeedMessage } from '../hooks/useSpeedMessage';
import ActionAlert from '../components/ActionAlert';
import ErrorPage from '../components/ErrorPage';

export default function ShoppingCartPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message } = useSpeedMessage();

    const { shoppingCart, userData } = useSelector(state => state);

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
                navigate("/checkout");
            }
        } else {
            navigate("/sing-up", { state: "shopping-cart", replace: true });
        }
    }

    function clearShoppingCart() {
        if (userData) {
            dispatch(clearCart(userData._id))
        } else {
            dispatch(clearCart_localy());
        }
    }

    if (shoppingCart.length) {
        return (
            <Grid container spacing={2} sx={{ minHeight: "calc(100vh - 57px - 30px)", mb: { xs: "43px" } }}>
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
                                        <WidthlyCard
                                            id={product._id}
                                            image={product.images}
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
        )
    } else return <ErrorPage hideAlertMsg title="Shopping cart is empty" errorType='empty' />
}
