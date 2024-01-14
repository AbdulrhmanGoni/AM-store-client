"use client"
import { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { CleaningServices } from '@mui/icons-material';
import { IllustrationCard, ActionAlert, LoadingCircle, P } from '@abdulrhmangoni/am-store-library';
import ProductsDisplayer from '@/components/ProductsDisplayer';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';
import customFetch from '@/functions/customFetch';
import useFavoritesActions from '@/hooks/useFavoritesActions';
import { clearFavorites_localy } from '@/state-management/favorites_slice';


function FavoritesPage() {

    const { message } = useSpeedMessage();
    const dispatch = useDispatch();
    const { clearFavorites } = useFavoritesActions();
    const productsIds = useSelector(state => state.favorites);
    const [products, setProducts] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setProducts(state => state?.filter(item => productsIds.includes(item._id)))
    }, [productsIds])

    useEffect(() => {
        if (productsIds) {
            customFetch("products", "POST", { productsIds })
                .then(setProducts)
                .catch(setError)
                .finally(() => setLoading(false));
        }
        else { setProducts([]) }
    }, [])

    function clear() {
        setIsClearing(true);
        clearFavorites()
            .then(() => { dispatch(clearFavorites_localy()) })
            .catch(() => message("Clearing products failed", "error"))
            .finally(() => { setIsClearing(false) })
    }

    return isLoading ?
        <LoadingCircle />
        : isError ? <Error />
            : products ?
                products.length ? (
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
                            <P variant='h6'>Favorites</P>
                            <ActionAlert
                                title="Clear favorites"
                                message="Are you sure you want to remove all products in your favorites?"
                                action={clear}
                            >
                                <Button
                                    variant='contained'
                                    size='small'
                                    startIcon={isClearing ? <CircularProgress size={22} color="primary" /> : <CleaningServices />}
                                    color='error'>
                                    Clear Favorites
                                </Button>
                            </ActionAlert>
                        </Paper>
                        <ProductsDisplayer>{products}</ProductsDisplayer>
                    </>
                )
                    : <Empty />
                : null
}

function Empty() {
    return (
        <IllustrationCard
            hideAlertMsg
            title="Favorites is empty"
            illustratorType='empty'
            style={{ flex: 1 }}
        />
    )
}

function Error() {
    return (
        <IllustrationCard
            title="Something went wrong"
            message="There is Something Wrong, may its network error or unexpected error"
            illustratorType='unexpected'
            withRefreshButton
            style={{ flex: 1 }}
        />
    )
}

export default FavoritesPage;