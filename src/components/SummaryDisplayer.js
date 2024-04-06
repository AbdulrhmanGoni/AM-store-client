import { Box, Divider, List, ListItem, Paper, TextField, useMediaQuery } from '@mui/material'
import { Discount } from '@mui/icons-material'
import { P, PriceDisplayer, findOriginalPrice } from "@abdulrhmangoni/am-store-library";
import { useSelector } from 'react-redux';

export default function SummaryDisplayer({ total, discount, delivery, items }) {

    const media = useMediaQuery("(max-width: 600px)");
    const deliveryPrice = useSelector(state => state.variables.deliveryPrice);

    const TextTitle = ({ children, style }) => {
        return (
            <P sx={style} fontWeight="bold" variant={media ? "subtitle2" : "subtitle1"} >
                {children}
            </P>
        )
    }

    const original = findOriginalPrice(total, discount?.value * 100)
    const priceStyle = { fontSize: media ? "15px" : "16px" }

    return (
        <Paper>
            <List sx={{ display: "flex", flexDirection: "column", p: "0px 8px", gap: 1, width: "100%", boxShadow: "green 0 0 8px -5px" }}>
                <ListItem sx={{ p: 1 }}>
                    <P variant='h6'>Summary</P>
                </ListItem>
                <Divider />
                <Li>
                    <TextTitle>Items ({items})</TextTitle>
                    <PriceDisplayer
                        price={discount?.value ? original : total}
                        style={priceStyle}
                    />
                </Li>
                {
                    discount?.value &&
                    <Li>
                        <TextTitle style={{ color: "primary.main" }}>discount: {discount?.value * 100}%</TextTitle>
                        <PriceDisplayer price={original * discount?.value} operator="-" />
                    </Li>
                }
                <Li>
                    <TextTitle>Delivery:</TextTitle>
                    {
                        delivery ?
                            <PriceDisplayer price={deliveryPrice} operator={"+"} style={priceStyle} />
                            : <P sx={{ color: "success.main" }} variant='body2'>Free</P>
                    }
                </Li>
                <Li>
                    <TextTitle style={{ color: "red", fontSize: "21px" }}>Total:</TextTitle>
                    <PriceDisplayer price={total} style={{ ...priceStyle, color: "red", fontSize: "20px" }} />
                </Li>
                <Divider />
                <Li style={{ pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: "1" }}>
                        <Discount sx={{ color: 'primary.main', mr: 1, my: 0.5, fontSize: "1rem" }} />
                        <TextField
                            defaultValue={discount?.name ?? "No Used Cobone"}
                            disabled
                            label="Cobone"
                            variant="standard"
                            sx={{ flexGrow: "1" }}
                        />
                    </Box>
                </Li>
            </List>
        </Paper>

    )
}

const Li = ({ children, style }) => {
    return (
        <ListItem sx={{ display: 'flex', justifyContent: "space-between", p: 1, ...style }}>
            {children}
        </ListItem>
    )
}