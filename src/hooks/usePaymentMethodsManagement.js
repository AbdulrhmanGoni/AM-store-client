import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPaymentMethods } from '@/state-management/userPaymentMethods_slice';
import { setCheckoutPaymentMethod } from '@/state-management/checkoutSummary_slice';
import usePaymentMethodsActions from '@/hooks/usePaymentMethodsActions';

export default function usePaymentMethodsManagement() {

    const dispatch = useDispatch();
    const { fetchPaymentMethods } = usePaymentMethodsActions();
    const { cardsList, choosedMethod } = useSelector(state => state.userPaymentMethods);
    const checkoutPaymentMethod = useSelector(state => state.checkoutSummary.paymentMethod);
    const userId = useSelector(state => state.userData?._id);
    const [paymentMethodType, setPaymentMethodType] = useState(null);
    const [toRender, setRender] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchError, setFetchError] = useState(false);
    const [refreshFetchingPaymentMethods, setRefreshFetchingPaymentMethods] = useState(false);

    function handleChoosingPaymentMethod(event) {
        setPaymentMethodType(event.target.value);
        event.target.value === "Cash" && dispatch(setCheckoutPaymentMethod("Cash"));
        event.target.value === "Card" && dispatch(setCheckoutPaymentMethod(choosedMethod));
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPaymentMethods()
            .then((userPaymentMethods) => {
                dispatch(setUserPaymentMethods(userPaymentMethods));
                isFetchError && setFetchError(false)
            })
            .catch(() => !isFetchError && setFetchError(true))
            .finally(() => setIsLoading(false))
    }, [userId, refreshFetchingPaymentMethods]);

    useEffect(() => {
        if (checkoutPaymentMethod === "Cash") {
            setPaymentMethodType("Cash");
        }
        if (typeof checkoutPaymentMethod?.number === "number") {
            setPaymentMethodType("Card");
        }
    }, [checkoutPaymentMethod, cardsList]);

    return {
        isLoading,
        isFetchError,
        cardsList,
        choosedMethod,
        paymentMethodType,
        toRender,
        render: setRender,
        handleChoosingPaymentMethod,
        refresh: () => setRefreshFetchingPaymentMethods(s => ++s)
    }
}
