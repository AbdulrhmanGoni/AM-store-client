"use client"
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
import { Edit, Payment } from '@mui/icons-material';
import Summary from '@/components/Summary';
import SectionTitle from '@/components/SectionTitle';
import PaymentMethodsManagement from '@/components/paymentSystem/PaymentMethodsManagement';
import SelectedLocationCard from '@/components/locationRegistring/SelectedLocationCard';
import ProductSmallCard from '@/components/ProductSmallCard';
import LMControl from '@/components/locationRegistring/LocationsManegementWindow';
import { clearCheckoutSummary } from '@/dataBase/checkoutSummary_slice';
import getCurrentDate from '@/functions/getCurrentDate';
import deliveryPrice, { includeLimit } from '@/CONSTANT/deliveryPrice';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import { applyDiscount } from '@/functions/cobones';
import { ActionAlert, loadingControl } from '@abdulrhmangoni/am-store-library';
import useOrdersActions from '@/hooks/useOrdersActions';
import pagesSpaces from '@/CONSTANT/pagesSpaces';


export default function CheckoutPage() {

    const shoppingCart = useSelector(state => state.shoppingCart);
    const userId = useSelector(state => state.userData?._id);
    const cobones = useSelector(state => state.cobones);
    const { selectedLocation } = useSelector(state => state.locations);
    const { totalPrice, discountCobone } = useSelector(state => state.checkoutSummary);
    const paymentMethod = useSelector(state => state.userPaymentMethods.choosedMethod);
    const { addNewOrder } = useOrdersActions();

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();

    function checkIfItValidToCheckout() {
        !paymentMethod && message("Select Your Payment Method Please");
        !selectedLocation && message("Select Your Location Please");
        return paymentMethod && selectedLocation;
    }

    function completingCheckout() {
        if (checkIfItValidToCheckout()) {
            const theOrder = prepareNewOrder();
            loadingControl(true);
            addNewOrder(theOrder)
                .then(res => {
                    if (res.ok) {
                        dispatch(clearCheckoutSummary());
                        window.location.replace("/");
                    }
                    else message("Sorry, Something went wrong");
                })
                .catch(() => message("There is unexpected error in the server"))
                .finally(() => loadingControl(false));
        }
    }

    function prepareNewOrder() {
        const discount = cobones[discountCobone];
        const products = shoppingCart.map(({ price, discount: customDiscount, category, count, _id }) => {
            const priceAfterDiscount = applyDiscount(applyDiscount(price, customDiscount), discount)
            return `${_id}-${count}-${priceAfterDiscount}-${category}`
        })

        return {
            userId,
            location: selectedLocation,
            products,
            totalPrice,
            paymentMethod,
            state: "Completed",
            expectedDeliveryDate: getCurrentDate(7),
            deliveryPrice: totalPrice > includeLimit ? 0 : deliveryPrice,
            discountCobone: { name: discountCobone, value: discount },
        }
    }

    return (
        <Grid container spacing={2} sx={{ flexDirection: { md: "row-reverse" }, mb: { xs: "43px" } }}>
            <Grid item md={8} sx={{ overflowY: "auto", width: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item width={"100%"}>
                        <SectionTitle titleStyle={{ pb: 1 }} title="Location">
                            <SelectedLocationCard
                                actionIcon={<LMControl size='small' startIcon={<Edit />} text="Change" />}
                            />
                        </SectionTitle>
                    </Grid>
                    <Grid item width="100%">
                        <SectionTitle titleStyle={{ pb: 1 }} title="Payment">
                            <PaymentMethodsManagement />
                        </SectionTitle>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className='full-width' item md={4}>
                <Summary />
                <ActionAlert
                    title="Are you sure to continue?"
                    message={`You have in your shoppnig cart ${shoppingCart.length} products and they costs $${totalPrice.toFixed(2)} dolar`}
                    action={completingCheckout}
                >
                    <Button
                        variant='contained'
                        sx={{ width: "100%", my: pagesSpaces }}
                        startIcon={<Payment />}
                        size="large"
                    >
                        Complate
                    </Button>
                </ActionAlert>
                <Box className="flex-column gap1" sx={{ p: "5px", height: "400px", overflow: "auto" }}>
                    {
                        shoppingCart.map((product) => (
                            <ProductSmallCard key={product._id} theProduct={product} />
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    )
}