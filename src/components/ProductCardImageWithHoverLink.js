import { Box, CardMedia } from '@mui/material';
import OverlayHoverLink from './OverlayHoverLink';


export default function ProductCardImageWithHoverLink({ productId, linkStyle, imageStyle }) {
    return (
        <Box
            className="flex-row-center"
            bgcolor={({ palette: { mode } }) => mode === "light" ? "black" : "white"}
            position="relative"
        >
            <CardMedia
                component="img"
                src={`/products/${productId}`}
                alt={imageAlt ?? `the image of ${productId}`}
                sx={imageStyle}
            />
            <OverlayHoverLink
                linkStyle={linkStyle}
                target={href}
            />
        </Box>
    )
}
