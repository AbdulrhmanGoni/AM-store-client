import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductsDisplayer from '../components/ProductsDisplayer';
import { Paper } from '@mui/material';
import { useFetch } from '../hooks/useFetch';
import { ErrorThrower, LoadingCircle, SearchForProductsField } from '@abdulrhmangoni/am-store-library';
import { ReadMore } from '@mui/icons-material';
import { host } from '../CONSTANT/hostName';


export default function SearchResultsPage() {

    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const { data: results, isLoading, isError } = useFetch(`products/?title=${params.get("title")}`, { init: [] });

    return (
        <>
            <Paper sx={{ p: 1, mb: 4, borderRadius: 1 }}>
                <SearchForProductsField
                    dominName={`${host}/`}
                    endItemIcon={<ReadMore />}
                    actionWithProductId={(id) => { navigate(`product-details/${id}`) }}
                    disableResultsList
                    defaultValue={params.get("title")}
                    onEnter={(searchInput) => {
                        let currentInput = params.get("title")
                        if (currentInput !== searchInput) {
                            params.set("title", searchInput)
                            setParams(params)
                        }
                    }}
                />
            </Paper>
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
