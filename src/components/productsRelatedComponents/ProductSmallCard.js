import { Rating, Box, Paper } from '@mui/material';
import { P, PriceDisplayer } from "@abdulrhmangoni/am-store-library";
import ProductCardImageWithHoverLink from './ProductCardImageWithHoverLink';

export default function ProductSmallCard({ theProduct }) {

    const { _id: productId, title, price, count, images, discount, rating } = theProduct;

    return (
        <Paper sx={{ display: "flex", gap: 1, p: 1 }}>
            <ProductCardImageWithHoverLink
                productId={productId}
                linkStyle={{ fontSize: "12px" }}
                imageSrc={images[0]}
                imageStyle={{
                    height: "100px",
                    width: "120px",
                    objectFit: "contain"
                }}
            />
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
                <Rating
                    precision={.5}
                    size='small'
                    value={rating?.ratingAverage}
                    readOnly
                />
            </Box>
        </Paper>
    );
}