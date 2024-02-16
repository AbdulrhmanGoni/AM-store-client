import { NotFound } from '@/app/products/error';
import serverFetch from '@/utilities/serverFetch';
import ProductsDisplayer from './ProductsDisplayer';
import { Suspense } from 'react';
import { LoadingCircle } from '../app/products/layout';

export default async function SearchResultsPage({ searchParams }) {

    const products = await serverFetch(`products/?${searchParams}`);

    return (
        <Suspense fallback={<LoadingCircle />}>
            {products?.length > 0 ? <ProductsDisplayer products={products} /> : <NotFound />}
        </Suspense>
    )
}
