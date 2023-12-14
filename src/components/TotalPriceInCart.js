import { useSelector } from 'react-redux';
import PriceDisplayer from './PriceDisplayer';
import calculateShoppingCartSum from '@/functions/calculateShoppingCartSum';

export default function TotalPriceInCart({ style }) {

    const shoppingCart = useSelector(state => state.shoppingCart);

    if (shoppingCart) {
        let totalPriceInCart = calculateShoppingCartSum(shoppingCart)
        return (
            totalPriceInCart ? <PriceDisplayer style={style} price={totalPriceInCart} /> : null
        );
    }

}
