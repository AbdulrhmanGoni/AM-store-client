import { nDecorator } from '@abdulrhmangoni/am-store-library';
import { Typography } from '@mui/material';
import React from 'react';

const PriceDisplayer = ({ price, currency = "$", style, variant, currencyStyle, operation }) => {

    const defaultCurrencyStyle = {
        fontSize: "14px",
        transform: "translate(0px, -5px)",
        display: "inline-block",
        margin: "0 2px 0 0",
        ...currencyStyle
    }

    return (
        <Typography variant={variant} sx={{ display: "inline-flex", p: "5px", ...style }}>
            <span
                style={{ ...defaultCurrencyStyle, ...currencyStyle }}>
                {currency}
            </span>
            {operation ?? null}
            {nDecorator(price?.toFixed(2))}
        </Typography>
    );
}

export default PriceDisplayer;
