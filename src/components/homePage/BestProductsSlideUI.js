"use client"
import useHomePageSlidersLogic from '@/hooks/useHomePageSlidersLogic';
import SliderProduct from './SliderProduct';

export default function BestProductsSlideUI({ products: initialProducts, error }) {

    const {
        products,
        isLoading,
        isError,
        fetchSuccess,
        fetchProducts
    } = useHomePageSlidersLogic("products/top-products?sort=earnings&limit=10", { initialProducts, initialError: error, initialSuccess: !error });

    return (
        <SliderProduct
            isLoading={isLoading}
            isError={isError}
            refetch={fetchProducts}
            products={products}
            sliderId="top-products"
            fetchSuccess={fetchSuccess}
        />
    )
}
