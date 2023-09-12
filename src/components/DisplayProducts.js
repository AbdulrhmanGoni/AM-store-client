import { useParams } from 'react-router-dom';
import ProductsDisplayer from './ProductsDisplayer';
import { useFetch } from '../hooks/useFetch';
import { Box } from '@mui/material';
import { ErrorThrower, LoadingCircle } from '@abdulrhmangoni/am-store-library';


export default function DisplayProducts() {

    const { category } = useParams();
    const { data: products, isLoading, isError } = useFetch(`products/?category=${category}`);

    return (
        <Box sx={{ mt: 2 }}>
            {
                isLoading ? <LoadingCircle />
                    : isError ? <ErrorThrower
                        title="Something Went Wrong!"
                        illustratorType="unexpected"
                        hideAlertMsg disableHeight
                    />
                        : products === false ? <ErrorThrower
                            title="No Results"
                            illustratorType="notFound"
                            hideAlertMsg disableHeight
                        />
                            : products ? <ProductsDisplayer>{products}</ProductsDisplayer>
                                : null
            }
        </Box>
    )
}