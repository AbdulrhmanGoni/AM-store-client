import { Grid } from '@mui/material';
import React from 'react';
import ProductCard from './ProductCard';

const ProductsDisplayer = ({ children }) => {

    const productsList = children.map((product) => {
        return (
            <Grid key={product._id} item xs={6} sm={4} md={3}>
                <ProductCard
                    sx={{ height: "100%" }}
                    theProduct={product}
                />
            </Grid>
        )
    })

    return (
        <Grid container spacing={2}>
            {productsList}
        </Grid>
    );
}

export default ProductsDisplayer;
