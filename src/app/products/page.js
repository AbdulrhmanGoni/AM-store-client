import { Paper } from '@mui/material';
import CategoriesBar from '@/components/CategoriesBar';
import SearchForProducts from '@/components/productsRelatedComponents/SearchForProducts';
import { Suspense } from 'react';
import SearchResultsPage from '@/components/productsRelatedComponents/SearchResultsPage';
import { LoadingCircle } from './layout';

export default function Page({ searchParams }) {
    return (
        <>
            <CategoriesBar />
            <Paper sx={{ p: 1, mb: 4, borderRadius: 1 }}>
                <SearchForProducts />
            </Paper>
            <Suspense fallback={<LoadingCircle />}>
                <SearchResultsPage searchParams={new URLSearchParams(searchParams).toString()} />
            </Suspense>
        </>
    )
}