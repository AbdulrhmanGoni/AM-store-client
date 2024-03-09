"use client"
import { useState } from 'react';
import SliderProduct from './SliderProduct';
import {
    useWhenElementAppears,
    useHTTPRequestState
} from '@abdulrhmangoni/am-store-library';
import serverAction from '@/utilities/serverAction';

export default function CategorySlide({ category }) {

    const [products, setProducts] = useState([]);
    const {
        isLoading,
        isError,
        setIsError,
        setIsLoading
    } = useHTTPRequestState();

    useWhenElementAppears(`${category}-slider`, () => {
        setIsLoading(true)
        serverAction(`products/?category=${category}&limit=10&cacheFor=1-hours`)
            .then((data) => {
                setProducts(data)
                isError && setIsError(false)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    })

    return (
        <SliderProduct
            products={products}
            sliderId={category}
            isLoading={isLoading}
            isError={isError}
        />
    )
}
