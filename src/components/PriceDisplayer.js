import { applyDiscount } from '@/functions/cobones';
import { nDecorator } from '@abdulrhmangoni/am-store-library';
import { Typography, Box, useMediaQuery } from '@mui/material';

const PriceDisplayer = (props) => {

    const mobileDevice = useMediaQuery("(max-width: 600px)")
    const {
        price,
        currency = "$",
        style,
        operator,
        discount
    } = props;
    const priceFontSize = mobileDevice ? ".88rem" : "1.02rem";
    const currencyFontSize = mobileDevice ? ".72rem" : ".8rem";

    return (
        <Box
            sx={{
                display: "inline-flex",
                flexDirection: "column",
                ...style
            }}
        >
            {
                discount &&
                <Box
                    className='flex-row-center gap1'
                    sx={{ fontSize: currencyFontSize, ml: 1 }}
                >
                    <span
                        style={{
                            color: 'gray',
                            textDecoration: "line-through"
                        }}
                    >
                        {price?.toFixed(2)}
                    </span>
                    <span style={{ color: 'red' }}>{discount * 100}%</span>
                </Box>
            }
            <Box className="flex-row">
                <span
                    style={{
                        fontSize: currencyFontSize,
                        transform: "translate(0px, -5px)",
                        display: "inline-block",
                        margin: "0 2px 0 0",
                        ...style
                    }}>
                    {currency}
                </span>
                <Typography style={{ fontSize: priceFontSize, ...style }}>
                    {operator ?? null}{nDecorator((discount ? applyDiscount(price, discount) : price)?.toFixed(2))}
                </Typography>
            </Box>
        </Box>
    );
}


export default PriceDisplayer;
