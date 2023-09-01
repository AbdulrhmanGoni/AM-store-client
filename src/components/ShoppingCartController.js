import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart_localy } from '../dataBase/shoppingCart_slice';
import { addToCart, addToCart_single } from '../dataBase/actions/shoppingCart_slice_actions';
import loadingControl from '../dataBase/actions/loadingControl';

export function createArray(num) {
    const arr = [];
    for (let i = 1; i <= num; i++) {
        arr.push(i);
    }
    return arr;
}

export default function ShoppingCartController({ productId }) {

    const dispatch = useDispatch();

    const { userData, shoppingCart } = useSelector(state => state);
    let [count, setCount] = useState(0);

    const theProduct = shoppingCart.find((item) => item._id === productId);

    const userId = userData ? userData._id : null;

    const changeCount = async (event) => {
        let value = event.target.value;
        if (value !== count) {
            if (userId) {
                loadingControl(true);
                await addToCart({ userId, productId, count: event.target.value })
                    .then(product => dispatch(addToCart_localy(product)))
                loadingControl(false);
            } else {
                dispatch(addToCart_localy({ _id: productId, count: event.target.value }));
            }
        }
    };

    useEffect(() => {
        if (theProduct) {
            setCount(theProduct.count);
        }
    }, [shoppingCart]);

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
                    labelId="Shopping Cart Controller"
                    value={count}
                    label="Count"
                    onChange={changeCount}
                >
                    <MenuItem className='shoppingCartControler' value={count ?? 1}>{count ?? 1}</MenuItem>
                    <Divider />
                    {createArray(theProduct.amount).map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }
}
