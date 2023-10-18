import ProductCard from './ProductCard';
import { useMediaQuery, Grid } from '@mui/material';

const ProductsDisplayer = ({ children, cardSx }) => {

    const xxSmallDevice = useMediaQuery("(max-width: 350px)");

    return (
        <Grid container spacing={2}>
            {
                children.map((product) => {
                    return (
                        <Grid key={product._id} item xs={xxSmallDevice ? 12 : 6} sm={4} md={3}>
                            <ProductCard
                                sx={{ height: "100%", ...cardSx }}
                                theProduct={product}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}

export default ProductsDisplayer;
