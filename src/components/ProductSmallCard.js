import { CardMedia, Rating, Box, Paper } from '@mui/material';
import OverlayHoverLink from './OverlayHoverLink';
import { P, PriceDisplayer } from "@abdulrhmangoni/am-store-library";

export default function ProductSmallCard({ theProduct }) {

    const { _id: productId, title, price, count, images, discount, rating } = theProduct;

    return (
        <Paper sx={{ display: "flex", gap: 1, p: 1 }}>
            <Box
                className="flex-row j-center"
                bgcolor={({ palette: { mode } }) => mode === "light" ? "black" : "white"}
                position="relative"
            >
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
                <Rating precision={0.5} size='small' value={rating?.ratingAverage} readOnly />
            </Box>
        </Paper>
    );
}