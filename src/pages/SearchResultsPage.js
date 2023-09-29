import { useSearchParams } from 'react-router-dom'
import ProductsDisplayer from '../components/ProductsDisplayer';
import SearchField from '../components/SearchField';
import { Box } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { ErrorThrower, LoadingCircle } from '@abdulrhmangoni/am-store-library';


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
                        !!results ? <NotFount /> : <SomethingWrong />
                        :
                        !!results.length ?
                            <ProductsDisplayer>{results}</ProductsDisplayer>
                            :
                            null
            }
        </>
    )
}

function NotFount() {
    return <ErrorThrower
        title="No Results"
        illustratorType="notFound"
        hideAlertMsg
        disableHeight
    />
}

function SomethingWrong() {
    return <ErrorThrower
        title="Something Went Wrong!"
        illustratorType="unexpected"
        hideAlertMsg
        disableHeight
    />
}
