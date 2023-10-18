import { useState } from 'react';
import { CardMedia, Rating, Typography, Box, Paper } from '@mui/material';
import PriceDisplayer from './PriceDisplayer';
import OverlayHoverLink from './OverlayHoverLink';

export default function ProductSmallCard({ theProduct }) {

    const [rate, setRate] = useState(3.5);

    return (
        <Paper elevation={1} sx={{ display: "flex", gap: 1, p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <CardMedia
                    component="img"
                    src={theProduct.images[0]}
                    alt={theProduct._id}
                    style={{
                        height: "100px",
                        width: "120px",
                        objectFit: "contain"
                    }}
                />
                <OverlayHoverLink linkStyle={{ fontSize: "12px" }} target={`/products/${theProduct._id}`} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant='subtitle2' className='limitationLines1'>{theProduct.title}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <PriceDisplayer style={{ fontSize: "1rem" }} variant="subtitle2" currency="$" price={theProduct.price} />
                    <Typography variant='body2'>Items({theProduct.count})</Typography>
                </Box>
                <Rating name="half-rating-read" precision={0.5} size='small' value={rate} readOnly />
            </Box>
        </Paper>
    );
}