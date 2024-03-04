import { loadingControl } from '@abdulrhmangoni/am-store-library';
import customFetch from "@/utilities/customFetch";
import { useSelector } from 'react-redux';

export default function usePaymentMethodsActions() {

    const userId = useSelector(state => state.userData?._id);
    const path = `users/${userId}/payment-methods`;

    const fetchPaymentMethods = async () => {
        return await customFetch(path);
    }

    const setChoosedPaymentMethod = async (theCard) => {
        loadingControl(true);
        const data = await customFetch(path, "POST", { theCard, type: "choosedMethod" });
        loadingControl(false);
        return data;
    }

    const addCridetCard = async (theCard) => {
        return await customFetch(path, "POST", { theCard });
    }

    const deleteCreditCard = async (cardNumber) => {
        return await customFetch(path, "DELETE", { cardNumber });
    }

    return {
        fetchPaymentMethods,
        setChoosedPaymentMethod,
        deleteCreditCard,
        addCridetCard
    }
}
