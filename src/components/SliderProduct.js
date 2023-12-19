"use client"
import styles from "./SliderProducts.module.css"
import { useEffect, useState, useRef } from "react";
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import ProductCard from "./ProductCard";
import { useFetch } from "@/hooks/useFetch";
import { ProductLoadingCard } from "./ProductLoadingCard";
import { FetchFailedAlert, useWhenElementAppears } from "@abdulrhmangoni/am-store-library";


export default function SliderProduct({ requestPath, sliderId }) {

    const containerRef = useRef();
    const media = useMediaQuery("(max-width: 600px)");
    const productsCount = 10;
    const cardWidth = media ? 160 : 230;
    const [slidersWidth, setSlidersWidth] = useState(cardWidth * productsCount);
    const [startFetching, setStartFetching] = useState(false);
    useWhenElementAppears(`${sliderId}-slider`, () => setStartFetching(true));
    const fetchOprions = { init: [], fetchCondition: startFetching };
    const { data: products, isLoading, isError, refetch } = useFetch(requestPath, fetchOprions);

    const scrollBtns = (move) => { containerRef.current.scrollLeft += move };

    useEffect(() => {
        const gapsBetweenCards = 15;
        const spacesSizeBetweenCards = products.length - 1 * gapsBetweenCards;
        const cardsWidth = products.length * cardWidth
        products.length && setSlidersWidth(cardsWidth + spacesSizeBetweenCards);
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
        <Box id={`${sliderId}-slider`} sx={{ position: "relative" }}>
            <div ref={containerRef} className={styles.sliderProductContainer}>
                <div className={styles.sliderProduct} style={{ width: `${slidersWidth}px`, minHeight: "345px" }}>
                    {
                        isLoading ? loadingCards
                            : isError ?
                                <FetchFailedAlert
                                    message="Fetching Products Failed"
                                    refetch={() => refetch()}
                                />
                                : products.map((product) => {
                                    return (
                                        <ProductCard
                                            key={product._id}
                                            sx={{ width: cardWidth }}
                                            theProduct={product}
                                            isBestSelling={sliderId === "top-products"}
                                        />
                                    )
                                })
                    }
                </div>
            </div>
            {
                !!products.length &&
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