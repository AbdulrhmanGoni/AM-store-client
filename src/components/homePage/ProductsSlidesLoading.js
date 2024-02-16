"use client"
import { ProductLoadingCard } from '../ProductLoadingCard'

export default function ProductsSlidesLoading({ cardWidth }) {

    return Array.from(Array(5)).map((_, index) => (
        <ProductLoadingCard key={index} cardWidth={cardWidth} />
    ))

}
