"use client"
import serverAction from '@/utilities/serverAction';
import ProductsDisplayer from './ProductsDisplayer';
import {
    useHTTPRequestState,
    LoadingCircle,
    FetchFailedAlert,
    useWhenElementAppears
} from '@abdulrhmangoni/am-store-library';
import { useEffect, useState } from 'react';
import useProductsSearchParams from '@/hooks/useProductsSearchParams';

export default function SearchResultsDisplayer({ initialResult, error }) {

    const { currentPath, currentSearchParams } = useProductsSearchParams();

    const {
        data: products,
        setData: setProducts,
        isLoading,
        setIsLoading,
        isError,
        setIsError
    } = useHTTPRequestState(initialResult?.products || [], { initialError: error });
    const [page, setPage] = useState(isError ? 1 : 2);
    const [thereIsMore, setIsThereMore] = useState(initialResult?.thereIsMore || isError ? true : false);
    const [pageRendered, setPageRendered] = useState(false);

    const endElementId = `${page}-${new URLSearchParams(currentSearchParams).toString()}`;

    function fetchNextProducts(initial) {
        setIsLoading(true);
        const search = new URLSearchParams(currentSearchParams)
        serverAction(`${currentPath}?${search.toString()}&page=${initial ? 1 : page}`)
            .then(result => {
                if (initial) {
                    setPage(2);
                    setProducts(result.products);
                } else {
                    setPage(page => ++page);
                    setProducts(state => [...state, ...result.products]);
                }
                !result.thereIsMore && setIsThereMore(false);
                isError && setIsError(false);
            })
            .catch(() => setIsError(false))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (pageRendered) {
            setIsThereMore(true);
            setProducts([]);
            fetchNextProducts(true);
        }
    }, [currentSearchParams])

    useEffect(() => setPageRendered(true), []);

    useWhenElementAppears(endElementId, fetchNextProducts);

    return (
        <>
            <ProductsDisplayer products={products} />
            {
                isLoading &&
                <LoadingCircle
                    style={{
                        height: "100%",
                        position: "relative",
                        minHeight: undefined,
                        my: 3
                    }}
                />
            }
            {
                !isLoading && isError &&
                <FetchFailedAlert
                    message='Error while fetching products'
                    refetch={fetchNextProducts}
                />
            }
            {
                !isError && thereIsMore && !!products.length && !isLoading &&
                <span id={endElementId} style={{ width: "100%", height: "50px" }}></span>
            }
        </>
    )
}
