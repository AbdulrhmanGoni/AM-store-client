"use client"
import SliderProduct from './SliderProduct';
import serverAction from '@/utilities/serverAction';
import { useHTTPRequestState } from '@abdulrhmangoni/am-store-library';
import { useEffect } from 'react';

export default function BestProductsSlideUI({ products, error }) {

    const {
        data,
        setData: setProducts,
        isLoading,
        isError,
        setIsLoading,
        setIsError
    } = useHTTPRequestState(products)

    function fetchBestProducts() {
        setIsLoading(true);
        serverAction(`products/top-products?sort=earnings&limit=10`)
            .then((products) => {
                setProducts(products)
                if (isError) setIsError(false);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => { setIsError(error) }, [])

    return (
        <SliderProduct
            isLoading={isLoading}
            isError={isError}
            refetch={fetchBestProducts}
            products={products || data || []}
            sliderId="top-products"
        />
    )
}
