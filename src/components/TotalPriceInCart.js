import { useSelector } from 'react-redux';
import PriceDisplayer from './PriceDisplayer';

const TotalPriceInCart = ({ style }) => {

    const shoppingCart = useSelector(state => state.shoppingCart);

    if (shoppingCart) {
        let totalPriceInCart = shoppingCart.reduce((acc, current) => acc + current.price * current.count, 0);
        return (
            totalPriceInCart ? <PriceDisplayer style={style} price={totalPriceInCart} /> : null
        );
    }

}

export default TotalPriceInCart;
