import { useSelector } from 'react-redux';
import { Alert, Box, List } from '@mui/material';
import { useState } from 'react';
import EmptyMassege from '../components/EmptyMassege';
import OrderCard from '../components/OrderCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingCircle from '../components/LoadingCircle';
import { useFetch } from '../hooks/useFetch';
import { host } from '../CONSTANT/hostName';
import withGurd from '../components/withGurd';


function OrdersPage({ userId }) {

    const { userData } = useSelector(state => state);
    const [display, setDisplay] = useState(0);
    const ordersFilter = ["In Progress", "Arrived"];
    const path = `${host}/orders/?userId=${userId}&state=${ordersFilter[display]}`
    const { data: orders, isError, isLoading } = useFetch(path, []);

    const handleChange = (event, newValue) => {
        setDisplay(newValue);
    };

    const btnStyle = { maxWidth: "100%", flexGrow: 1 };

    if (userData) {
        if (isLoading) return <LoadingCircle />
        else if (isError) return <Alert severity='error'>Something Went Wrong</Alert>
        else return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs value={display} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={btnStyle} label="Orders" />
                        <Tab sx={btnStyle} label="Arrived" />
                    </Tabs>
                </Box>
                <List sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, position: "relative" }}>
                    {
                        orders.length ?
                            orders.map((item) => <OrderCard key={item._id} order={item} />)
                            :
                            <EmptyMassege customMsg="No Orders Here" float={false} />
                    }
                </List>
            </Box>
        )
    }
}


export default withGurd(OrdersPage);
