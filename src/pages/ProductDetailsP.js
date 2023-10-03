import {
    Button, Divider, Grid, Rating,
    List, ListItem, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import { addToCart } from "../dataBase/actions/shoppingCart_slice_actions"
import { addToCart_localy } from "../dataBase/shoppingCart_slice"
import PriceDisplayer from "../components/PriceDisplayer";
import ToggleFavorite from "../components/ToggleFavorite";
import { useFetch } from "../hooks/useFetch";
import { LoadingButton } from "@mui/lab";
import CommentsSection from "../components/CommentsSection";
import { AvailabationState } from "../components/ProductCard";
import { ErrorThrower, LoadingCircle, ProductImagesDisplayer } from "@abdulrhmangoni/am-store-library";


export default function ProductDetailsP() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userData, shoppingCart } = useSelector(state => state);
    const { data: product, isError, isLoading, statusCode } = useFetch(`products/${id}`);

    const [isInCart, setAsInCart] = useState(false);
    const [loadingBtn, setLoading] = useState(false);

    const addToShoppingCart = async () => {
        if (userData) {
            setLoading(true);
            await addToCart({ productId: id, userId: userData._id })
                .then(product => dispatch(addToCart_localy(product)))
            setLoading(false);
        } else {
            dispatch(addToCart_localy(product));
        }
    }

    useEffect(() => {
        let theProduct = shoppingCart.find(item => item._id === id);
        if (theProduct) { setAsInCart(true) }
        else { setAsInCart(false) }
    }, [id, shoppingCart]);

    return isLoading ? <LoadingCircle /> :
        product ?
            <>
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ minHeight: "calc(100vh - 87px)", mb: 2 }}>
                    <Grid item xs={12} sm={6} sx={{ justifyContent: "center" }}>
                        <ProductImagesDisplayer images={product.images} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <List disablePadding>
                            <ListItem>
                                <Typography variant="h6">
                                    {product.title}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {product.description}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <PriceDisplayer currency="$" price={product.price} />
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography variant='subtitle2' sx={{
                                    fontSize: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <Rating precision={0.5} size='small' value={3.5} readOnly /> (82)
                                </Typography>
                                <ToggleFavorite productId={id} />
                            </ListItem>
                            <ListItem sx={{ justifyContent: "space-between" }}>
                                <Typography variant='subtitle2' sx={{
                                    fontSize: "13px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    <AvailabationState visitAllAmount amount={product.amount} />
                                </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem sx={{ gap: 1, justifyContent: "space-between" }}>
                                {
                                    isInCart ?
                                        <Button
                                            sx={{ width: "100%" }}
                                            size="small" variant="contained"
                                            onClick={() => navigate("/shopping-cart")}
                                            startIcon={<ShoppingCartCheckout />}>
                                            Go To Shopping Cart
                                        </Button>
                                        :
                                        <LoadingButton loading={loadingBtn} sx={{ width: "100%" }} size="small" onClick={addToShoppingCart} variant="contained" startIcon={<ShoppingCart />}>
                                            Add To Cart
                                        </LoadingButton>
                                }
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <CommentsSection />
            </> :
            statusCode === 404 ? <NotFound id={id} /> :
                isError ? <Unexpected /> : null
}

function NotFound({ id }) {
    return <ErrorThrower
        message={`We Couldn't Found Product with id: '${id}'`}
        title="404 Not Found"
        illustratorType="notFound"
    />
}

function Unexpected() {
    return <ErrorThrower
        illustratorType="unexpected"
        title="Unexpected Error"
        message='There are unexpected error, check your internet or refresh the page'
        withRefreshButton
    />
}