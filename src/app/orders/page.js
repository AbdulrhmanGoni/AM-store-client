"use client"
import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import OrdersList from '@/components/OrdersList';


export default function OrdersPage() {

    const [filter, setFilter] = useState(0);
    const ordersStates = ["Completed", "Pending"];

    const handleChange = (_, newValue) => { setFilter(newValue) };

    const btnStyle = { maxWidth: "100%", flexGrow: 1 };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs value={filter} onChange={handleChange}>
                    <Tab sx={btnStyle} label="Completed" />
                    <Tab sx={btnStyle} label="Pending" />
                </Tabs>
            </Box>
            {ordersStates[filter] == "Completed" ? <OrdersList orderState="Completed" /> : null}
            {ordersStates[filter] == "Pending" ? <OrdersList orderState="Pending" /> : null}
        </Box>
    )
}