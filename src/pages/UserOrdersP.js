import { Box, List } from '@mui/material';
import { useState } from 'react';
import OrderCard from '../components/OrderCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingCircle from '../components/LoadingCircle';
import { useFetch } from '../hooks/useFetch';
import withGurd from '../components/withGurd';
import ErrorPage from '../components/ErrorPage';


function OrdersPage({ userId }) {

    const [filter, setFilter] = useState(0);
    const ordersFilter = ["In Progress", "Arrived"];
    const path = `users/${userId}/orders?state=${ordersFilter[filter]}`
    const { data: orders, isError, isLoading } = useFetch(path, { init: [] });

    const handleChange = (_, newValue) => { setFilter(newValue) };

    const btnStyle = { maxWidth: "100%", flexGrow: 1 };

    if (isLoading) return <LoadingCircle />
    else if (isError) return <ErrorPage title="There is unexpected error" hideAlertMsg disableHeight errorType='unexpected' />
    else return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs value={filter} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={btnStyle} label="Orders" />
                    <Tab sx={btnStyle} label="Arrived" />
                </Tabs>
            </Box>
            <List sx={{ filter: "flex", flexDirection: "column", alignItems: "center", gap: 1, position: "relative" }}>
                {
                    orders.length ?
                        orders.map((item) => <OrderCard key={item._id} order={item} />)
                        :
                        <ErrorPage
                            title="No Orders Here"
                            hideAlertMsg
                            disableHeight
                            errorType='empty'
                        />
                }
            </List>
        </Box>
    )

}


export default withGurd(OrdersPage);
