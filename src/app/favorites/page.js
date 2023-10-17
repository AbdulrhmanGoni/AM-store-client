"use client"
import { useEffect, useState } from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { CleaningServices } from '@mui/icons-material';
import { ErrorThrower, ActionAlert, LoadingCircle } from '@abdulrhmangoni/am-store-library';
import ProductsDisplayer from '@/components/ProductsDisplayer';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import customFetch from '@/functions/customFetch';


function FavoritesPage() {

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const productsIds = useSelector(state => state.favorites);
    const [products, setProducts] = useState();
    const [isLoading, setLoading] = useState();
    const [isError, setError] = useState();

    function fetchProducts() {
        customFetch("products", "POST", { productsIds })
            .then(setProducts)
            .catch(setError)
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setProducts(state => state?.filter(item => productsIds.includes(item._id)))
    }, [productsIds])

    useEffect(() => { fetchProducts() }, [])

    function clear() {
        loadingControl(true);
        clearFavorites(userData._id)
            .then(res => {
                if (res) {
                    dispatch(clearFavorites_localy());
                    setData([]);
                }
            })
            .catch(() => message("Clearing products failed", "error"))
            .finally(() => { loadingControl(false) })
    }

    return (
        isLoading ?
            <LoadingCircle />
            : isError ?
                <ErrorThrower
                    title="Something went wrong"
                    message="There is Something Wrong, may its network error or unexpected error"
                    illustratorType='unexpected'
                    withRefreshButton
                />
                : products ?
                    products.length ?
                        <>
                            <Paper
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: 2, p: 2
                                }}
                            >
                                <Typography variant='h6'>Favorites</Typography>
                                <ActionAlert
                                    title="Clear favorites"
                                    message="Are you sure you want to remove all products in your favorites?"
                                    action={clear}
                                >
                                    <Button
                                        variant='contained'
                                        size='small'
                                        startIcon={<CleaningServices />}
                                        color='error'>
                                        Clear Favorites
                                    </Button>
                                </ActionAlert>
                            </Paper>
                            <ProductsDisplayer>{products}</ProductsDisplayer>
                        </>
                        :
                        <ErrorThrower
                            hideAlertMsg
                            title="Favorites is empty"
                            illustratorType='empty'
                        />
                    : null
    )
}

export default FavoritesPage;