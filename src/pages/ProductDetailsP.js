import { Button, Card, Divider, Grid, ImageList, ImageListItem, Paper, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ImageDispayer from '../components/ImageDispayer';
import { ShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import LoadingCircle from "../components/LoadingCircle";

import { addToCart } from "../dataBase/actions/shoppingCart_slice_actions"
import { addToCart_localy } from "../dataBase/shoppingCart_slice"
import PriceDisplayer from "../components/PriceDisplayer";
import ToggleFavorite from "../components/ToggleFavorite";
import { host } from "../CONSTANT/hostName";
import { useFetch } from "../hooks/useFetch";
import EmptyMassege from "../components/EmptyMassege";
import { LoadingButton } from "@mui/lab";
import { imagesArray } from "../CONSTANT/testingImage";
import CommentsSection from "../components/CommentsSection";
import { AvailabationState } from "../components/ProductCard";



export function FolderList() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
        </List>
    );
}


export default function ProductDetailsP() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userData, shoppingCart } = useSelector(state => state);
    const { data: product, isError, isLoading } = useFetch(`${host}/products/${id}`);

    const [isInCart, setAsInCart] = useState(false);
    const [isSliderOpen, setSliderState] = useState(false);
    const [openedImage, setOpenedImage] = useState(0);
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

    function openImage(index) {
        setOpenedImage(index);
        setSliderState(true);
    }

    useEffect(() => {
        let theProduct = shoppingCart.find(item => item._id === id);
        if (theProduct) {
            setAsInCart(true);
        } else {
            setAsInCart(false);
        }
    }, [id, shoppingCart]);

    if (isLoading) return <LoadingCircle />
    if (isError) return <EmptyMassege customMsg="We Couldn't Found The Product" />
    else if (product) {
        const productImages = imagesArray.map((img, index) => {
            return (
                <ImageListItem onClick={() => openImage(index)} key={img}>
                    <img src={img}
                        srcSet={img}
                        alt={img} loading="lazy"
                    />
                </ImageListItem>
            )
        })
        return (
            <>
                <Card elevation={1}>
                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ minHeight: "calc(100vh - 57px)" }}>
                        <Grid item sm={6} sx={{ justifyContent: "center" }}>
                                <ImageList>
                                    {productImages}
                                </ImageList>
                        </Grid>
                        <Grid item sm={6}>
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
                </Card>
                {isSliderOpen && <ImageDispayer title={product.title} imagesList={imagesArray} openedImage={openedImage} control={setSliderState} />}
                <CommentsSection />
            </>
        )
    }
}