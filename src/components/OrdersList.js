"use client"
import { List } from '@mui/material';
import OrderCard from '@/components/OrderCard';
import {
    IllustrationCard,
    LoadingCircle,
    useWhenElementAppears,
    FetchFailedAlert,
    useSlicedFetch
} from '@abdulrhmangoni/am-store-library';
import { host } from '@/CONSTANTS/hostName';

export default function OrdersList({ orderState }) {

    const path = `${host}/orders/users`;
    const ordersReturnType = "ordersReturnType=_paymentMethod,_discountCobone,_updatedAt,_deliveryPrice,_userId";
    const productsReturnType = "productsReturnType=images";
    const ordersState = `state=${orderState}`;
    const queries = `${ordersState}&${ordersReturnType}&${productsReturnType}`;

    const slicingOptions = {
        queryParams: queries,
        itemsIdPropertyName: "_id",
        autoFetchingFirstSlice: true,
        isUsersRequest: true
    }

    const {
        data: orders,
        isError,
        isLoading,
        isSuccess,
        getNextSlice,
        refetch
    } = useSlicedFetch(path, "orders", slicingOptions);

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
                    : isError ? <FetchFailedAlert refetch={refetch} message='Falied to fetch orders' />
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