"use client"
import ProductCard from './ProductCard';
import { useMediaQuery, Grid } from '@mui/material';

const ProductsDisplayer = ({ products, cardSx }) => {

    const xxSmallDevice = useMediaQuery("(max-width: 350px)");

    return (
        <Grid container spacing={2}>
            {
                products.map((product, index) => {
                    const onesDigit = +(`${index}`[1]);
                    const productOrder = onesDigit ? onesDigit : 1;
                    return (
                        <Grid key={product._id} item xs={xxSmallDevice ? 12 : 6} sm={4} md={3}>
                            <ProductCard
                                sx={{ height: "100%", ...cardSx }}
                                theProduct={product}
                                applyAnimation
                                appearingAnimationDelay={`${productOrder * .20}s`}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default ProductsDisplayer;
