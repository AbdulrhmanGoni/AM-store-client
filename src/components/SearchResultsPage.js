import { NotFound } from '@/app/products/error';
import serverFetch from '@/utilities/serverFetch';
import ProductsDisplayer from './ProductsDisplayer';

export default async function SearchResultsPage({ searchParams }) {
    const results = await serverFetch(`products/?${searchParams}`);

    return results?.length > 0 ?
        <ProductsDisplayer>{results}</ProductsDisplayer>
        : <NotFound />
}
