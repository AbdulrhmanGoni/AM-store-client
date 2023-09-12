import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Edit, LocationOn, Payment } from '@mui/icons-material';
import Summary from '../components/Summary';
import SectionTitle from '../components/SectionTitle';
import PaymentMethodForm from '../components/paymentSystem/PaymentMethodForm';
import { useNavigate } from 'react-router-dom';
import { SelectedLocationCard } from '../components/locationRegistring/LocationCard';
import { SmallCard } from '../components/ProductCard';
import LMControl from '../components/locationRegistring/LMControl';
import { clearCheckoutSummary } from '../dataBase/checkoutSummary_slice';
import getCurrentDate from '../functions/getCurrentDate';
import { fetchPaymentMethods } from '../dataBase/actions/userPaymentMethods_slice_actions';
import { fetchLocations } from '../dataBase/actions/locations_slice_actions';
import deliveryPrice, { includeLimit } from '../CONSTANT/deliveryPrice';
import { addNewOrder } from '../dataBase/actions/orders_actions';
import { useSpeedMessage } from '../hooks/useSpeedMessage';
import { applyDiscount } from '../dataBase/Categories/cobones';
import { ActionAlert, LoadingCircle, loadingControl } from '@abdulrhmangoni/am-store-library';

function CheckOutPage() {

    const {
        shoppingCart, userData, cobones,
        checkoutSummary: { totalPrice, discountCobone },
        locations: { selectedLocation },
        userPaymentMethods: { choosedMethod: paymentMethod }
    } = useSelector(state => state);

    const { message } = useSpeedMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (shoppingCart) {
            setProducts(shoppingCart);
        } else {
            navigate("/shopping-cart", { replace: true });
        }
    }, []);

    function checkIfItValidToCheckout() {
        if (paymentMethod && selectedLocation && shoppingCart.length > 0) {
            return true;
        } else {
            if (!paymentMethod) {
                message("Select Your Payment Method Please");
            }
            if (!selectedLocation) {
                message("Select Your Location Please");
            }
        }
    }

    function completingCheckout() {
        if (checkIfItValidToCheckout()) {
            let discount = cobones[discountCobone];
            const inCart = shoppingCart.reduce((acc, curr) => acc + curr.price * curr.count, 0);
            const products = shoppingCart.map((product) => {
                return `${product._id}-${product.count}-${applyDiscount(product.price, discount)}-${product.category}`
            });
            const theOrder = {
                userId: userData._id,
                location: selectedLocation,
                products,
                totalPrice: { before: inCart, after: totalPrice },
                paymentMethod,
                state: "Completed",
                deliveryDate: getCurrentDate(7),
                deliveryPrice: { value: totalPrice > includeLimit ? "Free" : deliveryPrice },
                discountCobone: { name: discountCobone, value: discount },
            }
            loadingControl(true);
            addNewOrder({ theOrder, userId: userData._id })
                .then(res => {
                    if (res.ok) {
                        window.location.replace("/");
                        dispatch(clearCheckoutSummary());
                    } else {
                        message("Sorry, Something Was Wrong");
                    }
                })
                .finally(() => loadingControl(false));
        }
    }

    return (
        <Grid container spacing={2} sx={{ flexDirection: { md: "row-reverse" }, minHeight: "calc(100vh - 57px - 30px)", mb: { xs: "43px" } }}>
            <Grid item md={8} sx={{ overflowY: "auto", width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item width={"100%"}>
                        <SectionTitle titleStyle={{ pb: 1 }} title="Location">
                            {
                                selectedLocation ?
                                    <Box sx={{ p: 1, borderRadius: 2 }}>
                                        <SelectedLocationCard
                                            icon={
                                                <LMControl
                                                    action="open"
                                                    size='small'
                                                    startIcon={<Edit />}
                                                    text="Change" />
                                            }
                                        />
                                    </Box>
                                    :
                                    <Alert
                                        action={
                                            <LMControl
                                                colorType='warning'
                                                size='small'
                                                startIcon={<LocationOn />}
                                                text="Add Location" />
                                        }
                                        sx={{ width: "100%", mb: 1, alignItems: "center" }}
                                        severity="warning">
                                        You Must Add Your Location
                                    </Alert>
                            }
                        </SectionTitle>
                    </Grid>
                    <Grid item width={"100%"}>
                        <SectionTitle titleStyle={{ pb: 1 }} title="Payment">
                            <PaymentMethodForm />
                        </SectionTitle>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4} sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }} >
                <Summary />
                <ActionAlert
                    title="Are you sure to continue?"
                    message={`You have in your shoppnig cart ${shoppingCart.length} products and they costs $${totalPrice.toFixed(2)} dolar`}
                    action={completingCheckout}
                >
                    <Button
                        variant='contained'
                        sx={{ width: "100%", bottom: "0", left: "0", zIndex: "500", position: { xs: "fixed", md: "relative" } }}
                        startIcon={<Payment />}
                        size="large"
                    >
                        Complate
                    </Button>
                </ActionAlert>
                <Box sx={{ p: "5px", display: "flex", flexDirection: "column", height: "400px", overflow: "auto", gap: 1 }}>
                    {
                        products.map((product) => (
                            <SmallCard key={product._id} theProduct={product} />
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

function WithCheckout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        userData,
        shoppingCart,
        userPaymentMethods: { cardsList },
        locations: { locationsList }
    } = useSelector(state => state);
    const [isLoading, setLoading] = useState(false);

    async function requierFetch() {
        const userId = userData?._id
        setLoading(true);
        !cardsList && await dispatch(fetchPaymentMethods(userId));
        !locationsList && await dispatch(fetchLocations(userId));
        setLoading(false);
    }

    useEffect(() => {
        if (!userData || !shoppingCart.length) {
            navigate("/shopping-cart", { replace: true });
            window.location.reload();
        }
        requierFetch();
    }, []);

    return isLoading ? <LoadingCircle /> : userData && locationsList && cardsList ? <CheckOutPage /> : null
}

export default WithCheckout;