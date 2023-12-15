import { useSelector } from 'react-redux';
import calculateShoppingCartSum from '@/functions/calculateShoppingCartSum';
import { PriceDisplayer } from "@abdulrhmangoni/am-store-library";

export default function TotalPriceInCart({ style }) {

    const shoppingCart = useSelector(state => state.shoppingCart);

    if (shoppingCart) {
        let totalPriceInCart = calculateShoppingCartSum(shoppingCart)
        return (
            totalPriceInCart ? <PriceDisplayer style={style} price={totalPriceInCart} /> : null
        );
    }

}
