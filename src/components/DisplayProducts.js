import { useParams } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import ProductsDisplayer from './ProductsDisplayer';
import { useFetch } from '../hooks/useFetch';
import { Alert, Box } from '@mui/material';
import EmptyMassege from './EmptyMassege';


export default function DisplayProducts() {

    const { category } = useParams();
    const { data: products, isLoading, isError } = useFetch(`products/?category=${category}`, []);

    return (<Box sx={{ mt: 2 }}>
        {isLoading ? <LoadingCircle /> :
            isError ? <Alert severity='error'>Something Went Wrong</Alert> :
                products.length ? <ProductsDisplayer>{products}</ProductsDisplayer> :
                    <EmptyMassege customMsg="There Are No Results" />}
    </Box>)
}