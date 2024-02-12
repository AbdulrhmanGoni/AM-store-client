import { Box, Button, Card, Chip, Divider, ImageList, ImageListItem } from "@mui/material";
import { ReadMore } from "@mui/icons-material";
import OverlayHoverLink from "./OverlayHoverLink";
import formatDate from "@/utilities/formatDate";
import { useRouter } from "next/navigation";
import { P, PriceDisplayer } from "@abdulrhmangoni/am-store-library";


export default function OrderCard({ order, cardId }) {

    const { push } = useRouter();

    const RowInfo = ({ children, sx, title }) => {
        return (
            <P sx={{ display: "flex", alignItems: "center", fontWeight: "bold", gap: 1, p: 1, ...sx }} variant='subtitle1'>
                {title}<P component='span' variant="body2">{children}</P>
            </P>
        )
    }

    const { city, country, street } = order.location;

    return (
        <Card id={cardId} sx={{ width: "100%" }}>
            <Box className="orderBar" sx={{
                position: "relative",
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                bgcolor: "primary.main",
                p: "4px 8px", color: "white"
            }}>
                <P>{order._id}</P>
            </Box>
            <Box sx={{
                display: "flex", p: "6px 10px",
                alignItems: "center", gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                borderBottom: "1px rgba(0, 0, 0, 0.12) solid"
            }}>
                <ImageList cols={1} sx={{ height: 170, width: 170, m: 0 }}>
                    {order.products.map((item) => (
                        <ImageListItem
                            key={item._id}
                            className="flex-center"
                        >
                            <Box component="img"
                                src={item.images[0]}
                                srcSet={item.images[1]}
                                alt={item._id}
                                loading="lazy"
                                sx={{ objectFit: "contain", width: "100%" }}
                            />
                            <OverlayHoverLink target={`/products/${item._id}`} linkStyle={{ fontSize: "11px" }} />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Box sx={{ flexGrow: 1, width: { xs: "100%", sm: "initial" } }}>
                    <RowInfo title="Order Date: ">{formatDate(order.createdAt)}</RowInfo>
                    <Divider />
                    <RowInfo title="Total: "><PriceDisplayer price={order.totalPrice} /></RowInfo>
                    <Divider />
                    <RowInfo title="Address: " sx={{ alignItems: { xs: "flex-start", sm: "center" } }}>
                        {country}, {city}, {street}
                    </RowInfo>
                    <Divider />
                    <RowInfo
                        title={order.state === "Arrived" ? "Arrived at: " : "Expected Arrival: "}
                        sx={{ alignItems: { xs: "flex-start", sm: "center" } }}>
                        {order.state === "Arrived" ? "order.arrivedAt" : order.expectedDeliveryDate}
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
                    <Chip
                        label={order.state}
                        sx={{ color: "white" }}
                        color={
                            order.state === "Completed" ? "success"
                                : order.state === "Canceled" ?
                                    "error" : "info"
                        }
                    />
                    <Button
                        sx={{ height: "fit-content" }}
                        variant='contained'
                        size='small'
                        startIcon={<ReadMore />}
                        onClick={() => push(`/orders/${order._id}`)}
                    >
                        Details
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}