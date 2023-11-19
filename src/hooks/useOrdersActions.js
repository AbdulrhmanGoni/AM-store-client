import customFetch from '@/functions/customFetch';
import { useSelector } from 'react-redux';


export default function useOrdersActions() {

    const userId =  useSelector(state => state.userData?._id)
    const path = `users/${userId}/orders`;

    async function addNewOrder(theOrder) {
        return await customFetch(path, "POST", { theOrder, userId });
    }

    return {
        addNewOrder
    }
}
