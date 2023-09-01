import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withCheckout = (Component) => {

    const Extracted = () => {
        const navigate = useNavigate();

        const shoppingCart = useSelector(state => state.shoppingCart);
        const userData = useSelector(state => state.userData);

        const [pass, setPass] = useState(false);

        useEffect(() => {
            if (shoppingCart && userData) {
                setPass(true);
            } else {
                navigate("/shopping-cart", { replace: true });
            }
        })

        return pass && userData && <Component />
    }

    return Extracted
}

export default withCheckout;
