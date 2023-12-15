"use client"
import { List, Alert, IconButton } from '@mui/material';
import OrderCard from '@/components/OrderCard';
import { IllustrationCard, LoadingCircle, useWhenElementAppears } from '@abdulrhmangoni/am-store-library';
import { useSelector } from 'react-redux';
import useSlicedFetch from '@/hooks/useSlicedFetch';
import { Refresh } from '@mui/icons-material';


export default function OrdersList({ orderState }) {

    const userId = useSelector(state => state.userData?._id);
    const path = `users/${userId}/orders`;
    const ordersReturnType = "ordersReturnType=_paymentMethod,_discountCobone,_updatedAt,_deliveryPrice,_userId";
    const productsReturnType = "productsReturnType=images";
    const ordersState = `state=${orderState}`;
    const queries = `${ordersState}&${ordersReturnType}&${productsReturnType}`;

    const slicingOptions = {
        queryParams: queries,
        contentName: "orders",
        itemsIdPropertyName: "_id",
        autoFetchingFirstSlice: true
    }

    const {
        data: orders,
        isError,
        isLoading,
        isSuccess,
        getNextSlice
    } = useSlicedFetch(path, slicingOptions);

    useWhenElementAppears("last-order-card", getNextSlice);

    return (
        <>
            <List className='flex-column-center gap1' sx={{ position: "relative" }}>
                {
                    orders?.map((order, index) => {
                        return (
                            <OrderCard
                                key={order._id}
                                order={order}
                                cardId={index === orders.length - 1 ? "last-order-card" : undefined}
                            />
                        )
                    })
                }
            </List>
            {
                isLoading ? <LoadingCircle style={{ height: "100%", position: "relative", minHeight: undefined, my: 3 }} />
                    : isError ? <UnexpectedError />
                        : !orders.length && isSuccess && <NoOrders />
            }
        </>
    )
}

function NoOrders() {
    return <IllustrationCard
        title="No Orders Here"
        hideAlertMsg
        disableHeight
        illustratorType='empty'
    />
}

function UnexpectedError({ getNextSlice }) {
    return (
        <Alert
            action={<IconButton onClick={getNextSlice}><Refresh /></IconButton>}
            sx={{ width: "100%" }}
            severity='error'
        >
            Falied to fetch comments
        </Alert>
    )
}
