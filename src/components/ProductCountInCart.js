import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart_localy } from '../dataBase/shoppingCart_slice';
import { loadingControl } from '@abdulrhmangoni/am-store-library';
import useShoppingCartActions from '@/hooks/useShoppingCartActions';


export default function ProductCountInCart({ productId }) {

    const dispatch = useDispatch();

    const { addToCart } = useShoppingCartActions();
    const shoppingCart = useSelector(state => state.shoppingCart);
    const userId = useSelector(state => state.userData?._id);
    let [count, setCount] = useState(0);

    const theProduct = shoppingCart.find((item) => item._id === productId);

    const changeCount = async ({ target }) => {
        let value = target.value;
        if (value !== count) {
            if (userId) {
                loadingControl(true);
                addToCart({ productId, count: value })
                    .then(() => dispatch(addToCart_localy({ ...theProduct, count: value })))
                    .catch(() => { message("Setting product' count failed for unknown reason") })
                    .finally(() => loadingControl(false))
            } else {
                dispatch(addToCart_localy({ ...theProduct, count: value }));
            }
        }
    };

    useEffect(() => { theProduct && setCount(theProduct.count) }, [shoppingCart, theProduct]);

    if (theProduct) {
        return (
            <FormControl
                variant="standard"
                disabled={!theProduct.amount}
                error={theProduct.amount < theProduct.count}
                sx={{ minWidth: 80 }}
                size="small">
                <InputLabel>Count</InputLabel>
                <Select
                    value={count}
                    label="Count"
                    onChange={changeCount}
                    MenuProps={{ sx: { maxHeight: "335px" } }}
                >
                    <MenuItem value={count ?? 1}>{count ?? 1}</MenuItem>
                    <Divider />
                    {
                        Array.from(Array(theProduct.amount)).map((_, index) => {
                            index++
                            return <MenuItem key={index} value={index}>{index}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        )
    }
}
