"use client"
import { Box, Grid } from '@mui/material';
import SummaryDisplayer from '@/components/SummaryDisplayer';
import ProductCardHorizontally from '@/components/ProductCardHorizontally';
import { ErrorThrower, LoadingCircle } from '@abdulrhmangoni/am-store-library';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';


export default function OrderDetails({ params: { orderId } }) {

    const userId = useSelector(state => state.userData?._id);
    const path = `users/${userId}/orders/${orderId}`
    const ordersReturnType = "ordersReturnType=_paymentMethod,_location,_updatedAt,_userId"
    const productsReturnType = "productsReturnType=basic"
    const queries = `?${ordersReturnType}&${productsReturnType}`
    const { data: order, isError, isLoading, statusCode } = useFetch(path + queries);

    return isLoading ? <LoadingCircle />
        : statusCode == 404 ? <NotFound />
            : isError ? <Unexpected />
                : order ?
                    <Grid container spacing={2}>
                        <Grid item md={4} width="100%">
                            <Box sx={{ p: "6px 0px" }}>
                                <SummaryDisplayer
                                    total={order.totalPrice}
                                    items={order.products.length}
                                    delivery={order.deliveryPrice}
                                    discount={order.discountCobone}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={8}>
                            <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 57px - 32px)", p: "6px 0px" }}>
                                <Grid container spacing={2}>
                                    {order.products.map((product) => {
                                        return (
                                            <Grid key={product._id} item xs={12}>
                                                <ProductCardHorizontally
                                                    imgWidth="150px"
                                                    id={product._id}
                                                    images={product.images}
                                                    title={product.title}
                                                    description={product.description}
                                                    price={product.price}
                                                    theProduct={product}
                                                    actionSec={false}
                                                    noPrice={true}
                                                    displayCount={product.count}
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid> : null
}

function NotFound() {
    return (
        <ErrorThrower
            title='Order not found'
            message="Sorry! We Couldn't Found The Order"
            illustratorType="notFound"
        />
    )
}

function Unexpected() {
    return (
        <ErrorThrower
            title='Something went wrong'
            hideAlertMsg
            illustratorType="unexpected"
        />
    )
}