import { useParams } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import ProductsDisplayer from './ProductsDisplayer';
import { useFetch } from '../hooks/useFetch';
import { Box } from '@mui/material';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { notFound, unexpected } from '../CONSTANT/images';


export default function DisplayProducts() {

    const { category } = useParams();
    const { data: products, isLoading, isError } = useFetch(`products/?category=${category}`, { init: [] });

    return (
        <Box sx={{ mt: 2 }}>
            {
                isLoading ? <LoadingCircle />
                    : isError ? <ErrorThrower
                        title="Something Went Wrong!"
                        errorType="unexpected"
                        customIllustrate={unexpected}
                        hideAlertMsg
                        disableHeight
                    />
                        : products.length ? <ProductsDisplayer>{products}</ProductsDisplayer>
                            :
                            <ErrorThrower
                                title="No Results"
                                alertType={404}
                                customIllustrate={notFound}
                                hideAlertMsg
                                disableHeight
                            />
            }
        </Box>
    )
}