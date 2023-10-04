import { Box, List, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import OrderCard from '../components/OrderCard';
import { useFetch } from '../hooks/useFetch';
import withGurd from '../components/withGurd';
import { ErrorThrower, LoadingCircle } from '@abdulrhmangoni/am-store-library';


function OrdersPage({ userId }) {

    const [filter, setFilter] = useState(0);
    const ordersFilter = ["Completed", "Confirmed"];
    const path = `users/${userId}/orders?state=${ordersFilter[filter]}`
    const { data: orders, isError, isLoading } = useFetch(path);

    const handleChange = (_, newValue) => { setFilter(newValue) };

    const btnStyle = { maxWidth: "100%", flexGrow: 1 };

    return <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs value={filter} onChange={handleChange} aria-label="basic tabs example">
                <Tab sx={btnStyle} label="Orders" />
                <Tab sx={btnStyle} label="Arrived" />
            </Tabs>
        </Box>
        <List sx={{ filter: "flex", flexDirection: "column", alignItems: "center", gap: 1, position: "relative" }}>
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


export default withGurd(OrdersPage);
