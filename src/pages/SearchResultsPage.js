import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductsDisplayer from '../components/ProductsDisplayer';
import { Box } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { ErrorThrower, LoadingCircle, SearchForProductsField } from '@abdulrhmangoni/am-store-library';
import { ReadMore } from '@mui/icons-material';


export default function SearchResultsPage() {

    const searchParams = useSearchParams()[0].get("title");
    const navigate = useNavigate();
    const { data: results, isLoading, isError } = useFetch(`products/?title=${searchParams}`, { init: [] });

    return (
        <>
            <Box sx={{ p: 1, backgroundColor: "primary.main", mb: 4, borderRadius: 1, color: "white" }}>
                <SearchForProductsField
                    dominName={`${searchParams}/`}
                    endItemIcon={<ReadMore />}
                    actionWithProductId={(id) => { navigate(`product-details/${id}`) }}
                />
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
