import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryDisplayer from '../components/SummaryDisplayer'
import { WidthlyCard } from '../components/ProductCard'
import getProductsByIdsList from '../dataBase/actions/getProductsByIdsList'
import LoadingCircle from '../components/LoadingCircle'
import { fetchOrderById } from '../dataBase/actions/orders_actions'
import withGurd from '../components/withGurd'
import EmptyMassege from '../components/EmptyMassege'



function OrderDetails({ userId }) {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);
    const [accessError, theAccessError] = useState(false);
    const [notFoundError, theNotFoundError] = useState(false);
    const [isLoading, theLoading] = useState(false);

    async function fetchOrderDetails() {
        theLoading(true);
        const theOrder = await fetchOrderById(id, userId);
        if (theOrder) {
            if (theOrder.userId === userId) {
                setOrder(theOrder);
                const fetchedProducts = await getProductsByIdsList(theOrder.products, true);
                setProducts(fetchedProducts);
            } else theAccessError(true);
        } else theNotFoundError(true);
        theLoading(false);
    }

    useEffect(() => {
        if (userId) {
            fetchOrderDetails();
        }
    }, []);

    if (isLoading) return <LoadingCircle />
    else if (notFoundError) return <EmptyMassege customMsg="Sorry! We Couldn't Found The Order" />
    else if (accessError) return <EmptyMassege customMsg="You Can't Access This Order" />
    else {
        if (products && order) {
            return (
                <Grid container spacing={2}>
                    <Grid item md={4} width="100%">
                        <Box sx={{ p: "6px 0px" }}>
                            <SummaryDisplayer
                                total={order.totalPrice}
                                items={order.products.length}
                                delivery={order.deliveryPrice.value}
                                discount={order.discountCobone}
                            />
                        </Box>
                    </Grid>
                    <Grid item md={8}>
                        <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 57px - 32px)", p: "6px 0px" }}>
                            <Grid container spacing={2}>
                                {products.map((product) => {
                                    return (
                                        <Grid key={product._id} item xs={12}>
                                            <WidthlyCard
                                                imgWidth="150px"
                                                id={product._id}
                                                image={product.images}
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
                </Grid>
            )
        }
    }
}

export default withGurd(OrderDetails);
