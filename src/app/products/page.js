import { Paper } from '@mui/material';
import CategoriesBar from '@/components/CategoriesBar';
import SearchForProducts from '@/components/productsRelatedComponents/SearchForProducts';
import { Suspense } from 'react';
import { LoadingCircle } from './layout';
import { NotFound } from './NotFound';
import SearchResultsDisplayer from '@/components/productsRelatedComponents/SearchResultsDisplayer';
import serverFetch from '@/utilities/serverFetch';

export default async function Page({ searchParams }) {

    const search = new URLSearchParams(searchParams);

    try {
        const initialResult = await serverFetch(`products/?${search.toString()}&page=1`);
        return <SearchResults initialResult={initialResult} />
    } catch (error) {
        return <SearchResults error />
    }

    function SearchResults({ initialResult, error }) {
        return (
            <>
                <CategoriesBar />
                <Paper sx={{ p: 1, mb: 4, borderRadius: 1 }}>
                    <SearchForProducts />
                </Paper>
                <Suspense fallback={<LoadingCircle />}>
                    {
                        error || initialResult.products?.length > 0 ?
                            <SearchResultsDisplayer
                                error={error}
                                initialResult={initialResult}
                                initialSearchParams={search}
                            />
                            : <NotFound />
                    }
                </Suspense>
            </>
        )
    }

}
