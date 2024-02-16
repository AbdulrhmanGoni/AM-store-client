"use client"
import { Button, Paper, CircularProgress } from '@mui/material';
import { CleaningServices } from '@mui/icons-material';
import { IllustrationCard, ActionAlert, LoadingCircle, P } from '@abdulrhmangoni/am-store-library';
import ProductsDisplayer from '@/components/productsRelatedComponents/ProductsDisplayer';
import useUserFavorites from '@/hooks/useUserFavorites';

function FavoritesPage() {

    const {
        products,
        isLoading,
        isError,
        clear,
        isClearing
    } = useUserFavorites()

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
                        <ProductsDisplayer products={products} />
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