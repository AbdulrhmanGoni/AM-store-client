import { useParams } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import ProductsDisplayer from './ProductsDisplayer';
import { useFetch } from '../hooks/useFetch';
import { Box } from '@mui/material';
import ErrorPage from './ErrorPage';


export default function DisplayProducts() {

    const { category } = useParams();
    const { data: products, isLoading, isError } = useFetch(`products/?category=${category}`, { init: [] });

    return (
        <Box sx={{ mt: 2 }}>
            {
                isLoading ? <LoadingCircle />
                    : isError ? <ErrorPage
                        title="Something Went Wrong!"
                        errorType="unexpected"
                        hideAlertMsg
                        disableHeight
                    />
                        : products.length ? <ProductsDisplayer>{products}</ProductsDisplayer>
                            :
                            <ErrorPage
                                title="No Results"
                                alertType={404}
                                hideAlertMsg
                                disableHeight
                            />
            }
        </Box>
    )
}