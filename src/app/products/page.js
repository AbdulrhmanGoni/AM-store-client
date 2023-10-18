"use client"
import ProductsDisplayer from '@/components/ProductsDisplayer';
import { Paper } from '@mui/material';
import { useFetch } from '@/hooks/useFetch';
import { ErrorThrower, LoadingCircle, SearchForProductsField } from '@abdulrhmangoni/am-store-library';
import { ReadMore } from '@mui/icons-material';
import { host } from '@/CONSTANT/hostName';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoriesBar from '@/components/CategoriesBar';
import useProductsSearchParams from '@/hooks/useProductsSearchParams';


export default function SearchResultsPage() {

    const { push } = useRouter();
    const params = useSearchParams();
    const { setParam } = useProductsSearchParams();
    const { data: results, isLoading, isError } = useFetch(`products/?${params.toString()}`, { init: [] });

    return (
        <>
            <CategoriesBar />
            <Paper sx={{ p: 1, mb: 4, borderRadius: 1 }}>
                <SearchForProductsField
                    dominName={`${host}/`}
                    endItemIcon={<ReadMore />}
                    actionWithProductId={(id) => { push(`products/${id}`) }}
                    disableResultsList
                    additionalFilter={params.get("category")}
                    defaultValue={params.get("title")}
                    onEnter={(searchInput) => { searchInput && setParam("title", searchInput) }}
                />
            </Paper>
            {
                isLoading ? <LoadingCircle sectionName="Search" />
                    : isError ?
                        !!results ? <NotFount /> : <SomethingWrong />
                        : !!results.length ?
                            <ProductsDisplayer>{results}</ProductsDisplayer>
                            : null
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
