"use client"
import { useState } from 'react';
import { Box, List, Tabs, Tab } from '@mui/material';
import OrderCard from '@/components/OrderCard';
import { useFetch } from '@/hooks/useFetch';
import { ErrorThrower, LoadingCircle } from '@abdulrhmangoni/am-store-library';
import { useSelector } from 'react-redux';


export default function OrdersPage() {

    const userId = useSelector(state => state.userData?._id);
    const [filter, setFilter] = useState(0);
    const ordersFilter = ["Completed", "Pending"];
    const path = `users/${userId}/orders`
    const ordersReturnType = "ordersReturnType=_paymentMethod,_discountCobone,_updatedAt,_deliveryPrice,_userId"
    const productsReturnType = "productsReturnType=images"
    const ordersState = `state=${ordersFilter[filter]}`
    const queries = `?${ordersState}&${ordersReturnType}&${productsReturnType}`
    const { data: orders, isError, isLoading } = useFetch(path + queries);

    const handleChange = (_, newValue) => { setFilter(newValue) };

    const btnStyle = { maxWidth: "100%", flexGrow: 1 };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs value={filter} onChange={handleChange}>
                    <Tab sx={btnStyle} label="Completed Orders" />
                    <Tab sx={btnStyle} label="Pending Orders" />
                </Tabs>
            </Box>
            <List className='flex-column-center gap1' sx={{ position: "relative" }}>
                {
                    isLoading ? <LoadingCircle style={{ height: "100%", position: "relative", minHeight: undefined }} />
                        : isError ? <UnexpectedError /> :
                            orders ?
                                orders.length ?
                                    orders.map((item) => <OrderCard key={item._id} order={item} />) : <NoOrders />
                                : null
                }
            </List>
        </Box>
    )
}

function NoOrders() {
    return <ErrorThrower
        title="No Orders Here"
        hideAlertMsg
        disableHeight
        illustratorType='empty'
    />
}

function UnexpectedError() {
    return <ErrorThrower
        title="There is unexpected error"
        hideAlertMsg
        disableHeight
        illustratorType='unexpected'
    />
}