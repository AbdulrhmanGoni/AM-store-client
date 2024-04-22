"use client"
import SliderProduct from './SliderProduct';
import { useWhenElementAppears } from '@abdulrhmangoni/am-store-library';
import useHomePageSlidersLogic from '@/hooks/useHomePageSlidersLogic';

export default function CategorySlide({ category }) {

    const {
        products,
        isLoading,
        isError,
        fetchSuccess,
        fetchProducts
    } = useHomePageSlidersLogic(`products/?category=${category}&limit=10`);

    useWhenElementAppears(`${category}-slider`, fetchProducts);

    return (
        <SliderProduct
            products={products}
            sliderId={category}
            isLoading={isLoading}
            isError={isError}
            refetch={fetchProducts}
            fetchSuccess={fetchSuccess}
        />
    )
}
