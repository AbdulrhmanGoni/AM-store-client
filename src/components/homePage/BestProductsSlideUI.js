"use client"
import SliderProduct from './SliderProduct';
import serverAction from '@/utilities/serverAction';
import { useHTTPRequestState } from '@abdulrhmangoni/am-store-library';

export default function BestProductsSlideUI({ products, error }) {

    const {
        data,
        setData: setProducts,
        isLoading,
        isError,
        setIsLoading,
        setIsError
    } = useHTTPRequestState(products || [], { initialError: error })

    function fetchBestProducts() {
        setIsLoading(true);
        serverAction("products/top-products?sort=earnings&limit=10")
            .then((products) => {
                setProducts(products)
                if (isError) setIsError(false);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    return (
        <SliderProduct
            isLoading={isLoading}
            isError={isError}
            refetch={fetchBestProducts}
            products={data || []}
            sliderId="top-products"
        />
    )
}
