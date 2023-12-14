import { useState } from 'react';
import { CardMedia, Rating, Box, Paper } from '@mui/material';
import PriceDisplayer from './PriceDisplayer';
import OverlayHoverLink from './OverlayHoverLink';
import { P } from "@abdulrhmangoni/am-store-library";

export default function ProductSmallCard({ theProduct }) {

    const { _id: productId, title, price, count, images, discount } = theProduct;
    const [rate, setRate] = useState(3.5);

    return (
        <Paper sx={{ display: "flex", gap: 1, p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <CardMedia
                    component="img"
                    src={images[0]}
                    alt={productId}
                    style={{
                        height: "100px",
                        width: "120px",
                        objectFit: "contain"
                    }}
                />
                <OverlayHoverLink linkStyle={{ fontSize: "12px" }} target={`/products/${productId}`} />
            </Box>
            <Box className="flex-column-center a-start" sx={{ flexGrow: 1 }}>
                <P variant='subtitle2' className='limitationLines1'>{title}</P>
                <Box className="flex-row-center-start gap2">
                    <PriceDisplayer
                        style={{ fontSize: "1rem" }}
                        variant="subtitle2"
                        currency="$"
                        price={price}
                        discount={discount}
                    />
                    <P variant='body2'>Items({count})</P>
                </Box>
                <Rating name="half-rating-read" precision={0.5} size='small' value={rate} readOnly />
            </Box>
        </Paper>
    );
}