import { useSearchParams } from 'react-router-dom'
import LoadingCircle from '../components/LoadingCircle';
import NotFoundPage from '../components/NotFoundPage';
import ProductsDisplayer from '../components/ProductsDisplayer';
import SearchField from '../components/SearchField';
import { Alert, Box } from '@mui/material';
import { host } from '../CONSTANT/hostName';
import { useFetch } from '../hooks/useFetch';
import EmptyMassege from '../components/EmptyMassege';


export default function SearchResultsPage() {

    const searchParams = useSearchParams()[0].get("title");
    const { data: results = [], isLoading, isError } = useFetch(`${host}/products/?title=${searchParams}`);

    return (
        <>
            <Box sx={{ p: 1, backgroundColor: "primary.main", mb: 4, borderRadius: 1, color: "white" }}>
                <SearchField currentParam={searchParams} />
            </Box>
            {
                isLoading ? <LoadingCircle sectionName="Search" />
                    :
                    isError ?
                        <Alert severity='error'>Something Went Wrong</Alert>
                        :
                        results.length ?
                            <ProductsDisplayer>{results}</ProductsDisplayer>
                            :
                            <EmptyMassege customMsg="No Search Result" />
            }
        </>
    )
}
