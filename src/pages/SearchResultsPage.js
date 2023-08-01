import { useSearchParams } from 'react-router-dom'
import LoadingCircle from '../components/LoadingCircle';
import ProductsDisplayer from '../components/ProductsDisplayer';
import SearchField from '../components/SearchField';
import { Box } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import ErrorPage from '../components/ErrorPage';


export default function SearchResultsPage() {

    const searchParams = useSearchParams()[0].get("title");
    const { data: results, isLoading, isError } = useFetch(`products/?title=${searchParams}`, { init: [] });

    return (
        <>
            <Box sx={{ p: 1, backgroundColor: "primary.main", mb: 4, borderRadius: 1, color: "white" }}>
                <SearchField currentParam={searchParams} />
            </Box>
            {
                isLoading ? <LoadingCircle sectionName="Search" />
                    :
                    isError ?
                        <ErrorPage
                            title="Something Went Wrong!"
                            errorType="unexpected"
                            hideAlertMsg
                            disableHeight
                        />
                        :
                        results.length ?
                            <ProductsDisplayer>{results}</ProductsDisplayer>
                            :
                            <ErrorPage
                                title="No Results"
                                errorType={404}
                                hideAlertMsg
                                disableHeight
                            />
            }
        </>
    )
}
