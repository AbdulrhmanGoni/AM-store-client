import { Reply } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import ShoppingCart from "./ShoppingCartP";
import UserProfile from "./UserProfileP";
import UserOrders from "./UserOrdersP";
import Favorite from "./FavoriteP";
import NotFoundPage from "../components/NotFoundPage";
import Logo from "../components/Logo";
import ProductDetails from "./ProductDetailsP";
import SearchResultsPage from "./SearchResultsPage";
import CheckOut from "./CheckOutPage";
import AddressManagement from "./AddressManagementP";
import PaymentMethodManagement from "./PaymentMethodManagementP";
import OrderDetails from "./OrderDetailsP";


const PagesContainer = () => {

    const { pagePath } = useParams();

    const RenderCurrentPage = () => {
        switch (pagePath) {
            case "shopping-cart": return <ShoppingCart />

            case "product-details": return <ProductDetails />

            case "search": return <SearchResultsPage />

            case "favorite": return <Favorite />

            case "user-profile": return <UserProfile />

            case "checkout": return <CheckOut />

            case "locations-Management": return <AddressManagement />

            case "payment-Methods-Management": return <PaymentMethodManagement />

            case "orders": return <UserOrders />

            case "order-details": return <OrderDetails />

            default: return <NotFoundPage />
        }
    }

    let lgContainer = ["shopping-cart", "search", "checkout", "order-details"];
    const containerWidth = lgContainer.includes(pagePath) ? "lg" : "md";

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ backgroundColor: "primary.main", color: "white" }}>
                    <Container maxWidth={containerWidth} sx={{ display: "flex", alignItems: "center", gap: 2, height: "57px" }}>
                        <IconButton onClick={() => window.history.back()} sx={{ color: "inherit" }}>
                            <Reply />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {pagePath ? pagePath.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") : ""}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
                            <Logo />
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth={containerWidth} sx={{ height: "100%", mt: "30px" }}>
                    <RenderCurrentPage />
                </Container>
            </Box>
        </>
    );
}

export default PagesContainer;
