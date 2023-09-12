import React, { useEffect } from 'react';
import PaymentMethodForm from '../components/paymentSystem/PaymentMethodForm';
import withGurd from '../components/withGurd';
import { fetchPaymentMethods } from '../dataBase/actions/userPaymentMethods_slice_actions';
import { useDispatch, useSelector } from 'react-redux';

function PaymentMethodManagementP() {

    const dispatch = useDispatch();
    const { userPaymentMethods: { cardsList }, userData } = useSelector(state => state);

    useEffect(() => {
        if (userData) {
            dispatch(fetchPaymentMethods(userData._id));
        }
    }, [userData]);

    return cardsList && <PaymentMethodForm />
}

export default withGurd(PaymentMethodManagementP);