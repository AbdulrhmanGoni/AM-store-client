import { Box, CardMedia } from '@mui/material';
import OverlayHoverLink from './OverlayHoverLink';


export default function ProductCardImageWithHoverLink({ productId, linkStyle, imageSrc, imageStyle }) {
    return (
        <Box
            className="flex-row-center"
            bgcolor={({ palette: { mode } }) => mode === "light" ? "black" : "white"}
            position="relative"
        >
            <CardMedia
                component="img"
                src={imageSrc}
                alt={`the image of ${productId}`}
                sx={imageStyle}
                loading="lazy"
            />
            <OverlayHoverLink
                linkStyle={linkStyle}
                target={`/products/${productId}`}
            />
        </Box>
    )
}
