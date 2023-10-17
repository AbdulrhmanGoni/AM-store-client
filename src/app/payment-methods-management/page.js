"use client"
import React, { useEffect } from 'react';
import PaymentMethodForm from '@/components/paymentSystem/PaymentMethodForm';
import { fetchPaymentMethods } from '@/dataBase/actions/userPaymentMethods_slice_actions';
import { useDispatch, useSelector } from 'react-redux';

export default function PaymentMethodsManagement() {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.userData?._id);
    const { cardsList } = useSelector(state => state.userPaymentMethods);

    useEffect(() => {
        !cardsList && dispatch(fetchPaymentMethods(userId))
    }, [cardsList, dispatch, userId]);

    return cardsList && <PaymentMethodForm />
}