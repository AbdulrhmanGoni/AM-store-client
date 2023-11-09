"use client"
import styles from "./SliderProducts.module.css"
import { useEffect, useState, useRef } from "react";
import { Alert, Box, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, Refresh } from '@mui/icons-material';
import ProductCard from "./ProductCard";
import { useFetch } from "@/hooks/useFetch";
import { ProductLoadingCard } from "./ProductLoadingCard";



export default function SliderProduct({ theCatagory }) {

    const containerRef = useRef();
    const media = useMediaQuery("(max-width: 600px)");
    const cardWidth = media ? 160 : 230;
    const [slidersWidth, setSlidersWidth] = useState(cardWidth * 10);
    const { data: products, isLoading, isError, refetch } = useFetch(`products/?category=${theCatagory}&limit=10`, { init: [] })

    const scrollBtns = (move) => { containerRef.current.scrollLeft += move }

    useEffect(() => {
        products.length && setSlidersWidth((products.length * cardWidth) + (products.length - 1 * 15));
    }, [cardWidth, products.length]);

    const loadingCards = Array.from(Array(5)).map((_, index) => <ProductLoadingCard key={index} cardWidth={cardWidth} />)

    const floatBtnStyle = {
        width: "35px",
        height: "35px",
        color: "primary.main",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        transition: ".4",
    }

    const bgHover = { backgroundColor: "rgba(0, 0, 0, 0.4)" }

    return (
        <Box sx={{ position: "relative" }}>
            <div ref={containerRef} className={styles.sliderProductContainer}>
                <div className={styles.sliderProduct} style={{ width: `${slidersWidth}px`, minHeight: "375px" }}>
                    {
                        isLoading ? loadingCards
                            : isError ?
                                <Alert
                                    className="flex-center full-width"
                                    severity="error"
                                    action={<IconButton onClick={() => refetch()}><Refresh /></IconButton>}
                                >
                                    Fetching Products Failed
                                </Alert>
                                : products?.map((product) => {
                                    return (
                                        <ProductCard
                                            key={product._id}
                                            sx={{ width: cardWidth }}
                                            theProduct={product}
                                        />
                                    )
                                })
                    }
                </div>
            </div>
            {
                products &&
                <>
                    <IconButton
                        sx={{ "&:hover": { ...bgHover }, ...floatBtnStyle, left: "0px" }}
                        onClick={() => scrollBtns(-(cardWidth + 15))}
                        className={styles.scrollToLeftBtn}
                    >
                        <ArrowBackIosNew size="small" />
                    </IconButton>
                    <IconButton
                        sx={{ "&:hover": { ...bgHover }, ...floatBtnStyle, right: "0px" }}
                        onClick={() => scrollBtns(cardWidth + 15)}
                        className={styles.scrollToRightBtn}
                    >
                        <ArrowForwardIos size="small" />
                    </IconButton>
                </>
            }
        </Box>
    );
}