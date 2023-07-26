import "./SliderProduct.css"
import { useEffect, useState, useRef } from "react";
import { Alert, Box, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import ProductCard, { InitialCard } from "./ProductCard";
import { host } from "../CONSTANT/hostName";
import { createArray } from "./ShoppingCartController";
import { useFetch } from "../hooks/useFetch";



export default function SliderProduct({ theCatagory }) {

    const containerRef = useRef();

    const media = useMediaQuery("(max-width: 600px)");
    const cardWidth = media ? 160 : 230;

    const { data: products, isLoading, isError } = useFetch(`${host}/products/?category=${theCatagory}&limit=10`, [])

    const [slidersWidth, setSlidersWidth] = useState(cardWidth * 10);

    const scrollBtns = (move) => {
        containerRef.current.scrollLeft += move;
    }

    useEffect(() => {
        if (products.length) {
            setSlidersWidth((products.length * cardWidth) + (products.length - 1 * 15));
        }
    }, []);

    function initialCard() {
        return createArray(10).map((_, index) => <InitialCard key={index} cardWidth={cardWidth} />)
    }

    const productsList = products.map((product) => {
        return (
            <ProductCard
                key={product._id}
                sx={{ width: cardWidth }}
                theProduct={product}
            />
        )
    });

    const floatBtnStyle = {
        width: "35px",
        height: "35px",
        color: "primary.main",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        transition: ".4",
    }

    function errorFetching() {
        return <Alert
            sx={{ justifyContent: "center", width: "100%" }}
            severity="error"
        >
            Fetching Products Failed
        </Alert>
    }

    const bgHover = { backgroundColor: "rgba(0, 0, 0, 0.4)" }

    return (
        <Box sx={{ position: "relative" }}>
            <div ref={containerRef} className="sliderProductContainer">
                <div className="sliderProduct" style={{ width: `${slidersWidth}px` }}>
                    {isLoading ? initialCard() : isError ? errorFetching() : productsList}
                </div>
            </div>
            <IconButton
                sx={{ "&:hover": { ...bgHover }, ...floatBtnStyle, left: "0px" }}
                onClick={() => scrollBtns(-(cardWidth + 15))}
                className="scrollToLeftBtn"
            >
                <ArrowBackIosNew size="small" />
            </IconButton>
            <IconButton
                sx={{ "&:hover": { ...bgHover }, ...floatBtnStyle, right: "0px" }}
                onClick={() => scrollBtns(cardWidth + 15)}
                className="scrollToRightBtn"
            >
                <ArrowForwardIos size="small" />
            </IconButton>
        </Box>
    );
}