import { Box, Button, Card, Chip, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceDisplayer from "./PriceDisplayer";
import { ReadMore } from "@mui/icons-material";
import PropTypes from 'prop-types';
import { testingImage } from "../CONSTANT/testingImage";
import OverlayHoverLink from "./OverlayHoverLink";
import getProductsByIdsList from "../dataBase/actions/getProductsByIdsList";
import formatDate from "../functions/formatDate";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Order({ order }) {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsByIdsList(order.products, false, "?type=images")
            .then(data => setProducts(data))
    }, []);

    const RowInfo = ({ children, sx, title }) => {
        return (
            <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold", gap: 1, p: 1, ...sx }} variant='subtitle1'>
                {title}<Typography component='span' variant="body2">{children}</Typography>
            </Typography>
        )
    }

    const { city, country, street } = order.location;

    return (
        <Card elevation={1} sx={{ width: "100%" }}>
            <Box className="orderBar" sx={{
                position: "relative",
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                backgroundColor: "primary.main",
                p: "4px 8px", color: "white"
            }}>
                <Typography>{order._id}</Typography>
            </Box>
            <Box sx={{
                display: "flex", p: "6px 10px",
                alignItems: "center", gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                borderBottom: "1px rgba(0, 0, 0, 0.12) solid"
            }}>
                <ImageList cols={1} sx={{ height: 170, width: 170, m: 0 }}>
                    {products.map((item) => (
                        <ImageListItem key={item._id}>
                            <img
                                src={testingImage}
                                srcSet={testingImage}
                                alt={item._id}
                                loading="lazy"
                            />
                            <OverlayHoverLink target={`/product-details/${item._id}`} linkStyle={{ fontSize: "11px" }} />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Box sx={{ flexGrow: 1, width: { xs: "100%", sm: "initial" } }}>
                    <RowInfo title="Order Date: ">
                        {formatDate(order.createdAt)}
                    </RowInfo>
                    <Divider />
                    <RowInfo title="Total: ">
                        <PriceDisplayer price={order.totalPrice.after} />
                    </RowInfo>
                    <Divider />
                    <RowInfo title="Address: " sx={{ alignItems: { xs: "flex-start", sm: "center" } }}>
                        {country}, {city}, {street}
                    </RowInfo>
                    <Divider />
                    <RowInfo title={order.state === "Arrived" ? "Arrived at: " : "Expected Arrival: "} sx={{ alignItems: { xs: "flex-start", sm: "center" } }}>
                        {
                            order.state === "Arrived" ?
                                "order.arrivedAt"
                                : order.deliveryDate
                        }
                    </RowInfo>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center", alignSelf: "stretch",
                    flexDirection: { xs: "row-reverse", sm: "column" },
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "initial" },
                    p: "8px 0px"
                }}>
                    <Chip label={order.state} color={
                        order.state === "In Progress" ? "info"
                            : order.state === "Canceled" ?
                                "error" : "success"
                    } />
                    <Button
                        sx={{ height: "fit-content" }}
                        variant='contained'
                        size='small'
                        startIcon={<ReadMore />}
                        onClick={() => navigate(`/order-details/${order._id}`)}
                    >
                        Details
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}