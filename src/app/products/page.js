import { Paper } from '@mui/material';
import CategoriesBar from '@/components/CategoriesBar';
import SearchForProducts from '@/components/SearchForProducts';
import { Suspense } from 'react';
import SearchResultsPage from '@/components/SearchResultsPage';


export default function Products({ searchParams }) {

    return (
        <>
            <CategoriesBar />
            <Paper sx={{ p: 1, mb: 4, borderRadius: 1 }}>
                <SearchForProducts />
            </Paper>
            <Suspense fallback={<h1>Loading...</h1>}>
                <SearchResultsPage searchParams={new URLSearchParams(searchParams).toString()} />
            </Suspense>
        </>
    )
}